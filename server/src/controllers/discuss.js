const Joi = require('joi')
const Koa = require('koa')

const { 
  comment: CommentModel,
  user: UserModel,
  reply: ReplyModel
} = require('../models').models

class DiscussController {
  /**
   *
   *
   * @static
   * @param {number} articleId
   * @returns {*}
   * @memberof DiscussController
   */
  static async getCommentList(articleId) {
    const data = await CommentModel.findAndCountAll({
      where: { articleId },
      attributes: ['id', 'content', 'createdAt'],
      include: [
        {
          model: ReplyModel,
          attributes: ['id', 'content', 'createdAt'],
          include: [{ model: UserModel, as: 'user', attributes: { exclude: ['updatedAt', 'password'] } }]
        },
        { model: UserModel, attributes: { exclude: ['updatedAt', 'password'] }, as: 'user' }
      ],
      row: true,
      order: [['createdAt', 'DESC']]
    })
    return data
  }

  /**
   *
   *
   * @static
   * @param {Koa.Context} ctx
   * @memberof DiscussController
   */
  static async create(ctx) {
    const checkRule = Joi.object({
      articleId: Joi.number().required(),
      userId: Joi.number().required(),
      content: Joi.string().required(),
      commentId: Joi.number()
    })
    const validator = checkRule.validate(ctx.request.body)

    if(validator) {
      const { articleId, userId, content } = ctx.request.body
      let commentId = ctx.request.body.commentId

      if(!commentId) {
        const comment = await CommentModel.create({ userId, articleId, content })
        commentId = comment.id
      } else {
        await ReplyModel.create({ userId, articleId, commentId, content })
      }

      const data = await DiscussController.getCommentList(articleId)
      //console.log(data)
      ctx.body = data
    } else {
      ctx.throw(403)
    }
  }

  /**
   *
   *
   * @static
   * @param {Koa.Context} ctx
   * @memberof DiscussController
   */
  static async deleteComment(ctx) {
    const checkRule = Joi.object({
      commentId: Joi.number().required()
    })
    const validator = checkRule.validate(ctx.params)

    if(validator) {
      const commentId = ctx.params.commentId
      await ReplyModel.destroy({ where: { commentId } })
      await CommentModel.destroy({ where: { id: commentId } })

      ctx.status = 204

    }
  }

  /**
   *
   *
   * @static
   * @param {Koa.Context} ctx
   * @memberof DiscussController
   */
  static async deleteReply(ctx) {
    const checkRule = Joi.object({
      replyId: Joi.number().required()
    })
    const validator = checkRule.validate(ctx.params)

    if(validator) {
      const replyId = ctx.params.replyId
      await ReplyModel.destroy({ where: { id: replyId } })
      ctx.status = 204
    }
  }
}

module.exports = DiscussController
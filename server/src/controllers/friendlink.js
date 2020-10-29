const Joi = require('joi')
const Koa = require('koa')
const { Op } = require('sequelize')

const { friendlink: FriendLinkModel } = require('../models').models

class FriendLinkController {


  static async findByLink(link) {
    const data = await FriendLinkModel.findOne({ where: { link }, attributes: ['id'] })
    return !data
  }

  static async findById(id) {
    const data = await FriendLinkModel.findOne({ where: { id }, attributes: ['id'] })
    return !!data
  }

  /**
   *
   *
   * @static
   * @param {Koa.Context} ctx
   * @memberof FriendLinkController
   */
  static async addFriendLink(ctx) {
    const checkRule = Joi.object({
      link: Joi.string(),
      avatarLink: Joi.string(),
      describe: Joi.string().required()
    })
    const validator = checkRule.validate(ctx.request.body)

    if(validator) {

      const { link, describe, avatarLink } = ctx.request.body
      if(await FriendLinkController.findByLink(link))
        await FriendLinkModel.create({ link, describe, avatarLink })

      ctx.status = 204

    } else {
      ctx.throw(403)
    }
  }

  /**
   *
   *
   * @static
   * @param {Koa.Context} ctx
   * @memberof FriendLinkController
   */
  static async updateFriendLink(ctx) {
    const checkRule = Joi.object({
      link: Joi.string(),
      describe: Joi.string(),
      linkId: Joi.number(),
      avatarLink: Joi.string()
    })
    const validator = checkRule.validate(ctx.request.body)

    if(validator) {

      const { link, describe, linkId, avatarLink } = ctx.request.body
      if(await FriendLinkController.findById(linkId))
        await FriendLinkModel.update({ link, describe, avatarLink }, { where: { id: linkId } })

      ctx.status = 204

    } else {
      ctx.throw(403)
    }
  }

  /**
   *
   *
   * @static
   * @param {Koa.Context} ctx
   * @memberof FriendLinkController
   */
  static async getFriendLinkList(ctx) {
    const checkRule = Joi.object({
      keyword: Joi.string()
    })
    const validator = checkRule.validate(ctx.query)

    if(validator) {
      const { keyword = '' } = ctx.query
      const data = await FriendLinkModel.findAndCountAll({
        where: {
          describe: {
            [Op.like]: `%${keyword}`
          }
        },
        order: [['createdAt', 'DESC']],
        row: true,
        distinct: true
      })

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
   * @memberof FriendLinkController
   */
  static async deleteFriendLink(ctx) {
    const checkRule = Joi.object({
      linkId: Joi.number().required()
    })
    const validator = checkRule.validate(ctx.params)

    if(validator) {
      const { linkId } = ctx.params
      await FriendLinkModel.destroy({ where: { id: linkId } })
      ctx.status = 204
    } else {
      ctx.throw(403)
    }
  }
}

module.exports = FriendLinkController
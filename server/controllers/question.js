const Joi = require('joi')
const { question: QuestionModel, answer: AnswerModel, sequelize } = require('../models')
const { PREVIEW_LENGTH } = require('../config')

class QuestionController {

  static async findQuestion(ctx) {

    const checkRule = Joi.object({
      id: Joi.number().required()
    })
    const validator = Joi.validate(ctx.params, checkRule)

    if(validator) {

      const { id } = ctx.params
      const data = await QuestionModel.findOne({
        where: { id },
        attributes: ['id', 'content', 'createdAt'],
        include: [
          {
            model: AnswerModel,
            attributes: ['id', 'content', 'createdAt'],
            as: 'answer'
          }
        ]
      })

      ctx.body = data

    } else {
      ctx.throw(404)
    }
  }

  static async getQuestionList(ctx) {

    const checkRule = Joi.object({
      page: Joi.number(),
      pageSize: Joi.number(),
      preview: Joi.number()
    })
    const validator = Joi.validate(ctx.query, checkRule)

    if(validator) {

      const { page = 1, pageSize = 10, preview = 0 } = ctx.query
      const data = await QuestionModel.findAndCountAll({
        attributes: ['id', 'content', 'createdAt'],
        include: [
          {
            model: AnswerModel,
            attributes: ['id', 'content', 'createdAt'],
            as: 'answer'
          }
        ],
        offset: pageSize * (page - 1),
        limit: pageSize,
        order: [['createdAt', 'DESC']],
        row: true,
        distinct: true
      })

      if(preview) {
        data.rows.forEach(q => {
          q.content = q.content.slice(0, PREVIEW_LENGTH.QUESTION)
          if(q.answer) q.answer.content = q.answer.content.slice(0, PREVIEW_LENGTH.ANSWER)
        })
      }

      ctx.body = data

    } else {
      ctx.throw(400)
    }
  }

  static async createQuestion(ctx) {

    const checkRule = Joi.object({
      content: Joi.string().required()
    })
    const validator = Joi.validate(ctx.request.body, checkRule)

    if(validator) {

      const { content } = ctx.request.body
      await QuestionModel.create({
        content
      })
      ctx.status = 204

    } else {
      ctx.throw(400)
    }
  }

  static async deleteQuestion(ctx) {

    const checkRule = Joi.object({
      id: Joi.number().required()
    })
    const validator = Joi.validate(ctx.params, checkRule)

    if(validator) {

      const { id } = ctx.params

      await QuestionModel.destroy({
        where: { id }
      })

      ctx.status = 204

    } else {
      ctx.throw(400)
    }
  }

}

module.exports = QuestionController
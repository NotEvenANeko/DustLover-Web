const Joi = require('joi')
const Koa = require('koa')

const { resolution: ResolutionModel } = require('../models').models

class ResolutionController {

  /**
   *
   *
   * @static
   * @param {Koa.Context} ctx
   * @memberof ResolutionController
   */
  static async addRecord(ctx) {

    const checkRule = Joi.object({
      resolution: Joi.string().required()
    })
    const validator = checkRule.validate(ctx.request.body)

    if(validator) {

      const { resolution } = ctx.request.body
      const regexp = /^\d+x\d+$/
      if(regexp.test(resolution)) {
        const data = await ResolutionModel.findOrCreate({ where: { type: resolution } })
        if(!data[1]) {
          data[0].count++
          await ResolutionModel.update({ id: data[0].id, type: data[0].type, count: data[0].count }, { where: { id: data[0].id } })
        }
      }
    }

    ctx.status = 204

  }

  /**
   *
   *
   * @static
   * @param {Koa.Context} ctx
   * @memberof ResolutionController
   */
  static async getList(ctx) {

    const data = await ResolutionModel.findAndCountAll({
      attributes: ['type', 'count'],
      order: [['count', 'DESC']]
    })

    ctx.body = data

  }
}

module.exports = ResolutionController
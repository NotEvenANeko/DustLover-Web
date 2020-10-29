const { Op } = require('sequelize')
const Koa = require('koa')

const { tag: TagModel, category: CategoryModel, sequelize } = require('../models')

class TagController {

  /**
   *
   *
   * @static
   * @param {Koa.Context} ctx
   * @memberof TagController
   */
  static async getTagList(ctx) {
    const data = await TagModel.findAll({
      attributes: ['name', [sequelize.fn('COUNT', sequelize.col('name')), 'count']],
      group: 'name',
      where: {
        articleId: { [Op.not]: null }
      },
      order: [[sequelize.fn('COUNT', sequelize.col('name')), 'desc']]
    })

    ctx.body = data
  }

  /**
   *
   *
   * @static
   * @param {Koa.Context} ctx
   * @memberof TagController
   */
  static async getCategoryList(ctx) {
    const data = await CategoryModel.findAll({
      attributes: ['name', [sequelize.fn('COUNT', sequelize.col('name')), 'count']],
      group: 'name',
      where: {
        articleId: { [Op.not]: null }
      },
      order: [[sequelize.fn('COUNT', sequelize.col('name')), 'desc']]
    })

    ctx.body = data    
  }
}

module.exports = TagController
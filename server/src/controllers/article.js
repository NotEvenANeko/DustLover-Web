const Joi = require('joi')
const Koa = require('koa')
const { Op } = require('sequelize')
const fs = require('fs')

const {
  article: ArticleModel,
  user: UserModel,
  tag: TagModel,
  category: CategoryModel,
  comment: CommentModel,
  reply: ReplyModel
} = require('../models').models
const { uploadPath, findOrCreateFilePath } = require('../utils/file')

class ArticleController {
  static async initData() {
    const res = await ArticleModel.findOne({ where: { id: -1 } })
    if(!res) {
      ArticleModel.create({
        id: -1,
        title: 'data init',
        content: 'data init'
      })
    }
  }

  /**
   *
   *
   * @static
   * @param {Koa.Context} ctx
   * @memberof ArticleController
   */
  static async create(ctx) {
    const checkRule = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
      categoryList: Joi.array(),
      tagList: Joi.array()
    })
    const validator = checkRule.validate(ctx.request.body)

    if(validator) {

      const { title, content, categoryList = [], tagList = [] } = ctx.request.body
      const res = await ArticleModel.findOne({ where: { title } })

      if(res) {
        ctx.throw(403, 'Article Exist')
      } else {

        const tags = tagList.map(t => ({ name: t }))
        const categories = categoryList.map(c => ({ name: c }))
        const data = await ArticleModel.create(
          { title, content, tags, categories },
          { include: [TagModel, CategoryModel] }
        )
        ctx.body = data
      }
    } else {
      ctx.throw(403)
    }
  }

  /**
   *
   *
   * @static
   * @param {Koa.Context} ctx
   * @memberof ArticleController
   */
  static async findById(ctx) {
    const checkRule = Joi.object({
      id: Joi.number().required(),
      type: Joi.number()
    })
    const validator = checkRule.validate({ ...ctx.params, ...ctx.query })
    if(validator) {

      const id = ctx.params.id
      const { type = 1 } = ctx.query
      const data = await ArticleModel.findOne({
        where: { id },
        include: [
          { model: TagModel, attributes: ['name'] },
          { model: CategoryModel, attributes: ['name'] },
          {
            model: CommentModel,
            attributes: ['id', 'content', 'createdAt'],
            include: [
              { model: UserModel, as: 'user', attributes: ['uid', 'username', 'avatar'] },
              {
                model: ReplyModel,
                attributes: ['id', 'content', 'createdAt', 'userId'],
                include: [{ model: UserModel, as: 'user', attributes: ['uid', 'username', 'avatar'] }]
              }
            ]
          }
        ],
        order: [[CommentModel, 'createdAt', 'DESC']],
        row: true
      })

      if(type === 1) {
        ArticleModel.update({ viewCnt: ++data.viewCnt }, { where: { id } })
      }
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
   * @memberof ArticleController
   */
  static async getList(ctx) {
    const checkRule = Joi.object({
      page: Joi.number(),
      pageSize: Joi.number(),
      keyword: Joi.string().allow(''),
      category: Joi.string(),
      tag: Joi.string(),
      preview: Joi.number()
    })
    const validator = checkRule.validate(ctx.query)

    if(validator) {

      const { page = 1, pageSize = 10, keyword = '', preview = 1, tag, category } = ctx.query
      const tagFilter = tag ? { name: tag } : null
      const categoryFilter = category ? { name: category } : null
      const data = await ArticleModel.findAndCountAll({
        where: {
          id: {
            [Op.not]: -1
          },
          [Op.or]: [
            {
              title: {
                [Op.like]: `%${keyword}`
              }
            },
            {
              content: {
                [Op.like]: `%${keyword}`
              }
            }
          ]
        },
        include: [
          { model: TagModel, attributes: ['name'], where: tagFilter },
          { model: CategoryModel, attributes: ['name'], where: categoryFilter },
          { 
            model: CommentModel, 
            attributes: ['id'],
            include: [{ model: ReplyModel, attributes: ['id'] }]
          }
        ],
        offset: (page - 1) * pageSize,
        limit: parseInt(pageSize),
        order: [['createdAt', 'DESC']],
        row: true,
        distinct: true
      })
      if(preview === 1) {
        data.rows.forEach(d => {
          d.content = d.content.slice(0, 1000)
        })
      }

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
   * @memberof ArticleController
   */
  static async update(ctx) {
    const checkRule = Joi.object({
      articleId: Joi.number().required(),
      title: Joi.string().required(),
      content: Joi.string().required(),
      categories: Joi.array(),
      tags: Joi.array()
    })
    const validator = checkRule.validate({
      articleId: ctx.params.id,
      ...ctx.request.body
    })

    if(validator) {

      const { title, content, categories = [], tags = [] } = ctx.request.body
      const articleId = ctx.params.id
      const tagList = tags.map(t => ({ name: t.name, articleId }))
      //console.log(tagList)
      const categoryList = categories.map(c => ({ name: c.name, articleId }))
      await ArticleModel.update({ title, content }, { where: { id: articleId } })
      await TagModel.destroy({ where: { articleId } })
      await TagModel.bulkCreate(tagList)
      await CategoryModel.destroy({ where: { articleId } })
      await CategoryModel.bulkCreate(categoryList)
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
   * @memberof ArticleController
   */
  static async delete(ctx) {
    const checkRule = Joi.object({
      id: Joi.number().required()
    })
    const validator = checkRule.validate(ctx.params)
    if(validator) {

      const articleId = ctx.params.id
      await ArticleModel.destroy({ where: { id: articleId } })
      await ReplyModel.destroy({ where: { articleId } })
      await CommentModel.destroy({ where: { articleId } })
      await TagModel.destroy({ where: { articleId } })
      await CategoryModel.destroy({ where: { articleId } })
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
   * @memberof ArticleController
   */
  static async checkExist(ctx) {
    const checkRule = Joi.object({
      fileNameList: Joi.array().required()
    })
    const validator = checkRule.validate(ctx.request.body)
    if(validator) {

      const { fileNameList } = ctx.request.body
      const list = await Promise.all(
        fileNameList.map(async fileName => {
          const filePath = `${uploadPath}/${fileName}`
          const title = fileName.replace(/\.md/, '')
          const article = await ArticleModel.findOne({ where: { title }, attributes: ['id'] })
          const result = { fileName, title }
          if(article) {
            result.exist = true,
            result.articleId = article.id
          }
          return result
        })
      )
      ctx.body = list

    } else {
      ctx.throw(403)
    }
  }

  /**
   *
   *
   * @static
   * @param {Koa.Context} ctx
   * @memberof ArticleController
   */
  static async upload(ctx) {
    const file = ctx.request.files.file

    await findOrCreateFilePath(uploadPath)

    //console.log(file)

    const upload = file => {
      const reader = fs.createReadStream(file.path)
      const fileName = file.name
      const filePath = `${uploadPath}/${fileName}`
      const upStream = fs.createWriteStream(filePath)
      reader.pipe(upStream)

      reader.on('end', () => {
        console.log('upload complete')
      })
    }

    Array.isArray(file) ? file.forEach(it => upload(it)) : upload(file)
    ctx.status = 204
  }

  /**
   *
   *
   * @static
   * @param {Koa.Context} ctx
   * @memberof ArticleController
   */
  static async uploadConfirm(ctx) {
    //console.log(ctx.request.body)
    const checkRule = Joi.object({
      uploadList: Joi.array()
    })
    const validator = checkRule.validate(ctx.request.body)
    if(validator) {
      const { uploadList } = ctx.request.body
      await findOrCreateFilePath(uploadPath)
      
      const parseList = list => {
        return list.map(item => {
          const filePath = `${uploadPath}/${item.fileName}`
          const content = fs.readFileSync(filePath, 'utf-8')
          const data = {
            title: item.fileName.replace(/\.md/, ''),
            content
          }
          if(item.articleId) data.articleId = item.articleId
          return data
        })
      }

      const list = parseList(uploadList)
      const updateList = list.filter(d => !!d.articleId)
      const insertList = list.filter(d => !d.articleId)

      const insertResultList = await Promise.all(
        insertList.map(data => ArticleModel.create(data))
      )

      const updateResultList = await Promise.all(
        updateList.map(async data => {
          const { title, content, articleId } = data
          await ArticleModel.update({ title, content }, { where: { id: articleId } })
          return ArticleModel.findOne({ where: { id: articleId } })
        })
      )

      ctx.body = {
        message: 'success',
        insertList: insertResultList,
        updateList: updateResultList
      }

    } else {
      ctx.throw(403)
    }
  }
}

module.exports = ArticleController
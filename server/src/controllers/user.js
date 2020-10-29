const Joi = require('joi')
const Koa = require('koa')
const { user: UserModel } = require('../models').models
const { Op } = require('sequelize')
const { createAccessToken, createRefreshToken } = require('../utils/token')
const { checkInfo, enCrypt } = require('../utils/bcrypt')

class UserController {

  /**
   *
   *
   * @static
   * @param {number} uid
   * @param {object} data
   * @returns {*}
   * @memberof UserController
   */
  static async updateUserById(uid, data) {
    return await UserModel.update(data, { where: { uid } })
  }

  /**
   *
   *
   * @static
   * @param {Koa.Context} ctx
   * @memberof UserController
   */
  static async getUserList(ctx) {

    const checkRule = Joi.object({
      page: Joi.number(),
      pageSize: Joi.number()
    })
    const validator = checkRule.validate(ctx.query)

    if(validator) {

      const { page = 1, pageSize = 10 } = ctx.query
      const data = await UserModel.findAndCountAll({
        attributes: ['uid', 'username', 'createdAt', 'updatedAt', 'role'],
        offset: pageSize * (page - 1),
        limit: pageSize,
        order: [['createdAt', 'DESC']],
        row: true
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
   * @memberof UserController
   */
  static async login(ctx) {

    const checkRule = Joi.object({
      account: Joi.string().required(),
      password: Joi.string().required()
    })

    const validator = checkRule.validate(ctx.request.body)

    if(validator) {
      const { account, password } = ctx.request.body
      const user = await UserModel.findOne({
        where: {
          [Op.or]: [{ email: account }, { username: account }]
        }
      })
      if(!user) {
        ctx.throw(403, 'Login Failed')
      } else {
        const hashedPassword = user.password
        if(await checkInfo(password, hashedPassword)) {
          const { uid, role, username } = user
          const payload = { uid, role }
          const accessToken = createAccessToken(payload)
          const refreshToken = createRefreshToken(payload)
          ctx.body = {
            username,
            userId: uid,
            userRole: role,
            accessToken, refreshToken
          }
        } else {
          ctx.throw(403, 'Login Failed')
        }
      }
    } else {
      ctx.throw(403, 'Login Failed')
    }
  }

  /**
   *
   *
   * @static
   * @param {Koa.Context} ctx
   * @memberof UserController
   */
  static async register(ctx) {

    const checkRule = Joi.object({
      username: Joi.string().required(),
      eMail: Joi.string().required(),
      password: Joi.string().required()
    })

    const validator = checkRule.validate(ctx.request.body)

    if(validator) {

      const { username, eMail, password } = ctx.request.body
      const usernameResult = await UserModel.findOne({ where: { username } })

      if(usernameResult) {
        ctx.throw(403, 'Username has been used')
      } else {

        const eMailResult = await UserModel.findOne({ where: { eMail } })

        if(eMailResult) {
          ctx.throw(403, 'E-Mail has been used')
        } else {

          const hashedPassword = await enCrypt(password)
          await UserModel.create({
            username,
            nickname: username,
            password: hashedPassword,
            eMail
          })
          ctx.status = 204

        }
      }

    } else {
      ctx.throw(403, 'Register Failed')
    }

  }

  /**
   *
   *
   * @static
   * @param {Koa.Context} ctx
   * @memberof UserController
   */
  static async getUserInfo(ctx) {

    const checkRule = Joi.object({
      id: Joi.number().required()
    })

    const validator = checkRule.validate(ctx.params)

    if(validator) {

      const { id } = ctx.params
      const data = await UserModel.findOne({ 
        where: { uid: id },
        attributes: ['uid', 'username', 'nickname', 'eMail', 'role', 'createdAt', 'updatedAt']
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
   * @memberof UserController
   */
  static async deleteUser(ctx) {

    const checkRule = Joi.object({
      id: Joi.number().required()
    })
    const validator = checkRule.validate(ctx.params)

    if(validator) {

      const { id } = ctx.params
      await UserModel.destroy({ where: { uid: id } })
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
   * @memberof UserController
   */
  static async updateUserInfo(ctx) {
    const checkRule = Joi.object({
      id: Joi.number().required(),
      nickname: Joi.string().required(),
      memo: Joi.string()
    })
    const validator = Joi.validate({
      ...ctx.request.body,
      id: ctx.params.id
    }, checkRule)

    if(validator) {
      const { id } = ctx.params
      const { nickname, memo = '' } = ctx.request.body

      await UserModel.update({ nickname, memo }, { where: { uid: id } })

      ctx.status = 204

    } else {
      ctx.throw(400)
    }
  }

  /**
   *
   *
   * @static
   * @param {Koa.Context} ctx
   * @memberof UserController
   */
  static async changeUserPasswd(ctx) {
    const checkRule = Joi.object({
      id: Joi.number().required(),
      password: Joi.string().required(),
      oldpassword: Joi.string().required()
    })
    const validator = Joi.validate({
      id: ctx.params.id,
      ...ctx.request.body
    }, checkRule)

    if(validator) {

      const id = ctx.params.id
      const { password, oldpassword } = ctx.request.body
      const user = UserModel.findOne({ where: { uid: id } })
      if(!user) ctx.throw(403)
      const hashedPassword = user.password
      if(await checkInfo(oldpassword, hashedPassword)) {
        const newHashedPassword = enCrypt(password)
        await UserModel.update({ password: newHashedPassword }, { where: { uid: user.uid } })
        ctx.status = 204
      } else {
        ctx.throw(401, 'Passwd incorrect')
      }

    } else {
      ctx.throw(400)
    }
  }
}

module.exports = UserController
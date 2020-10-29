const Koa = require('koa')
const fs = require('fs')
const Joi = require('joi')

const { user: UserModel } = require('../models')

const { avatarPath, findOrCreateFilePath } = require('../utils/file')

class AvatarController {
  /**
   *
   *
   * @static
   * @param {Koa.Context} ctx
   * @memberof AvatarController
   */
  static async uploadAvatar(ctx) {

    await findOrCreateFilePath(avatarPath)

    const checkRule = Joi.object({
      id: Joi.number().required()
    })
    const validator = Joi.validate(ctx.params, checkRule)

    if(validator) {

      const file = ctx.request.files.file
      let extName = ''
      switch(file.type) {
        case 'image/pjpeg': extName = 'jpg'; break;
        case 'image/jpeg': extName = 'jpg'; break;
        case 'image/png': extName = 'png'; break;
        case 'image/x-png': extName = 'png'; break;
        default: break;
      }

      if(!extName) {
        ctx.throw(415, '请上传jpg或png格式文件')
      }

      const reader = fs.createReadStream(file.path)
      const fileName = file.name
      const filePath = `${avatarPath}/${fileName}`
      const upStream = fs.createWriteStream(filePath)
      reader.pipe(upStream)

      reader.on('end', () => {
        console.log('upload complete')
      })

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
   * @memberof AvatarController
   */
  static async confirmUploadAvatar(ctx) {
    const checkRule = Joi.object({
      fileName: Joi.string().required(),
      id: Joi.number().required()
    })
    const validator = Joi.validate(ctx.request.body, checkRule)
    if(validator) {

      await UserModel.update({ avatar: `${avatarPath}/${fileName}` }, { where: { uid: id } })

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
   * @memberof AvatarController
   */
  static async getAvatar(ctx) {

    await findOrCreateFilePath(avatarPath)

    const checkRule = Joi.object({
      id: Joi.number().required()
    })
    const validator = Joi.validate(ctx.params, checkRule)

    if(validator) {

      const { id } = ctx.params

      const user = await UserModel.findOne({
        where: { uid: id },
        attributes: ['avatar']
      })
      const { avatar: avatarPathh } = user
      //console.log(avatarPath)
      const data = fs.readFileSync(avatarPathh)
      ctx.body = data
      ctx.type = 'image'

    } else {
      ctx.throw(403)
    }
  }
}

module.exports = AvatarController
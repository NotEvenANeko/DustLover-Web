const { TOKEN } = require('../config')
const jwt = require('jsonwebtoken')
const Promise = require('bluebird')

module.exports.createAccessToken = body => {

  const accessToken = jwt.sign(body, TOKEN.ACCESS_SECRET, { expiresIn: TOKEN.ACCESS_TIME })
  return accessToken
  
}

module.exports.createRefreshToken = body => {

  const refreshToken = jwt.sign(body, TOKEN.REFRESH_SECRET, { expiresIn: TOKEN.REFRESH_TIME })
  return refreshToken
  
}

module.exports.checkRefreshToken = ctx => {

  return new Promise((resolve, reject) => {

    var token = ctx.header['authorization']

    if(token) {

      token = token.split(' ')[1]
      jwt.verify(token, TOKEN.REFRESH_SECRET, (err, payload) => {
        
        if(err) {
          reject('Token Expired or Incorrect')
        } else {
          payload = {
            uid: payload.uid,
            role: payload.role
          }
          resolve(this.createAccessToken(payload))
        }
      })
    } else {
      reject('Token Error')
    }
  })
}

module.exports.checkAccessToken = (ctx, roleList = []) => {

  return new Promise((resolve, reject) => {

    var token = ctx.header['authorization']

    if(token) {

      token = token.split(' ')[1]
      jwt.verify(token, TOKEN.ACCESS_SECRET, (err, payload) => {

        if(err) {

          reject('Token Error')

        } else {

          if(!!roleList.find(role => {
            //console.log(role.params)
            if(payload.role <= 1) return true
            if(payload.role < role.role) return true
            if(payload.role > role.role) return false
            if(role.url.includes('account') || role.url.includes('avatar') || (role.url.includes('discuss') && role.method.toUpperCase() === 'DELETE'))
              return role.params == payload.uid || role.params.id == payload.uid
            return true
          })) {

            resolve('OK')

          } else {

            reject('Authorization Error')

          }
        }
      })

    } else {

      reject('No Token')

    }
  })
}

module.exports.refreshAccessToken = async ctx => {

  await this.checkRefreshToken(ctx)
            .then(accessToken => {
              //console.log(accessToken)
              ctx.body = {
                accessToken
              }
            })
            .catch(err => {
              ctx.throw(401, err)
            })

}
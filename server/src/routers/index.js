const fs = require('fs')
const Koa = require('koa')

/**
 * 
 * @param {Koa} app 
 */
module.exports = app => {
  fs.readdirSync(__dirname).forEach(file => {
    if(file !== 'index.js') {
      const route = require(`./${file}`)
      app.use(route.routes()).use(route.allowedMethods())
    }
  })
}
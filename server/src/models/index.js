const fs = require('fs')
const { Sequelize } = require('sequelize')
const path = require('path')

const { DATABASE } = require('../config')

const sequelize = new Sequelize({
  dialect: DATABASE.DIALECT,
  storage: DATABASE.PATH
})

/**
 * 
 */
const db = {}

/**
 * 
 * @param {string} str 
 */
const trim = str => {
  return str.match(/[_]*(.+)[_]*/)[1]
}

fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js')
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))
    //console.log(trim(model.name))
    db[trim(model.name)] = model
  })

Object.keys(db)
      .forEach(modelName => {
        if(db[modelName].associate) {
          db[modelName].associate(db)
        }
      })

db.sequelize = sequelize

module.exports = db
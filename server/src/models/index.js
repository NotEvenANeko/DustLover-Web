const fs = require('fs')
const { Sequelize, DataTypes } = require('sequelize')
const path = require('path')

const { DATABASE } = require('../config')

const sequelize = new Sequelize({
  dialect: DATABASE.DIALECT,
  storage: DATABASE.PATH
})

const db = {}

/**
 * 
 * @param {string} str 
 */
const trim = str => {
  return str.match(/[_]*(.+)[_]*/)[1]
}

fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file !== 'index.d.ts')
  .forEach(file => {
    const func = require(__dirname + '/' + file)
    func(sequelize, DataTypes)
    //console.log(trim(model.name))

  })

Object.keys(sequelize.models)
      .forEach(modelName => {
        if(sequelize.models[modelName].associate) {
          sequelize.models[modelName].associate(sequelize.models)
        }
      })

exports.models = sequelize.models
exports.sequelize = sequelize
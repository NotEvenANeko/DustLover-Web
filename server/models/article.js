const moment = require('moment')
const Sequelize = require('sequelize')

module.exports = (sequelize, dataTypes = Sequelize.DataTypes) => {
  const Article = sequelize.define(
    'article',
    {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: dataTypes.TEXT,
        allowNull: false
      },
      content: {
        type: dataTypes.TEXT,
        allowNull: false
      },
      viewCnt: {
        type: dataTypes.INTEGER,
        defaultValue: 0
      },
      createdAt: {
        type: dataTypes.DATE,
        defaultValue: dataTypes.NOW,
        get() {
          return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss')
        }
      },
      updatedAt: {
        type: dataTypes.DATE,
        defaultValue: dataTypes.NOW,
        get() {
          return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss')
        }
      }
    }, {
      timestamps: true
    }
  )

  Article.associate = models => {
    Article.hasMany(models.comment)
    Article.hasMany(models.reply)
    Article.hasMany(models.tag)
    Article.hasMany(models.category)
  }

  return Article
}
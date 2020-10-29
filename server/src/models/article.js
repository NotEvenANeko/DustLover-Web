const dayjs = require('dayjs')
const { Sequelize, DataTypes, Model } = require('sequelize')

/**
 * 
 * @param {Sequelize} sequelize 
 * @param {DataTypes} dataTypes 
 */
module.exports = (sequelize, dataTypes) => {
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
          return dayjs(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss')
        }
      },
      updatedAt: {
        type: dataTypes.DATE,
        defaultValue: dataTypes.NOW,
        get() {
          return dayjs(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss')
        }
      }
    }, {
      timestamps: true
    }
  )

  /**
   * 
   * @param {Model} models 
   */
  Article.associate = models => {
    Article.hasMany(models.comment)
    Article.hasMany(models.reply)
    Article.hasMany(models.tag)
    Article.hasMany(models.category)
  }

  return Article
}
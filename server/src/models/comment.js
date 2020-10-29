const dayjs = require('dayjs')
const { Sequelize, DataTypes, Model } = require('sequelize')

/**
 * 
 * @param {Sequelize} sequelize 
 * @param {DataTypes} dataTypes 
 */
module.exports = (sequelize, dataTypes) => {
  const Comment = sequelize.define(
    'comment',
    {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncerment: true
      },
      content: {
        type: dataTypes.TEXT,
        allowNull: false
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
  Comment.associate = models => {
    Comment.belongsTo(models.article, {
      as: 'article',
      foreignKey: 'articleId',
      targetKey: 'id',
      constraints: false
    })
    Comment.belongsTo(models.user, {
      foreignKey: 'userId',
      targetKey: 'uid',
      constraints: false
    })
    Comment.hasMany(models.reply, {
      foreignKey: 'commentId',
      targetKey: 'id',
      constraints: false
    })
  }

  return Comment
}
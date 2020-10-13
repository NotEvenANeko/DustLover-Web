const moment = require('moment')
const Sequelize = require('sequelize')

module.exports = (sequelize, dataTypes = Sequelize.DataTypes) => {
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
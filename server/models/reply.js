const moment = require('moment')
const Sequelize = require('sequelize')

module.exports = (sequelize, dataTypes = Sequelize.DataTypes) => {
  const Reply = sequelize.define(
    'reply',
    {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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

  Reply.associate = models => {
    Reply.belongsTo(models.user, {
      foreignKey: 'userId',
      targetKey: 'uid',
      constraints: false
    })
  }

  return Reply
}
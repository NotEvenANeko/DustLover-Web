const moment = require('moment')
const Sequelize = require('sequelize')

module.exports = (sequelize, dataTypes = Sequelize.DataTypes) => {
  const Answer = sequelize.define(
    'answer',
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

  Answer.associate = models => {
    Answer.hasOne(models.question, {
      constraints: false
    })
  }

  return Answer
}
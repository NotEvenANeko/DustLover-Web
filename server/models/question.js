const moment = require('moment')

module.exports = (sequelize, dataTypes) => {
  const Question = sequelize.define(
    'question',
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

  Question.associate = models => {
    Question.hasOne(models.answer)
  }

  return Question
}
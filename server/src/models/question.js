const dayjs = require('dayjs')
const { Sequelize, DataTypes, Model } = require('sequelize')

/**
 * 
 * @param {Sequelize} sequelize 
 * @param {DataTypes} dataTypes 
 */
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
  Question.associate = models => {
    Question.hasOne(models.answer)
  }

  return Question
}
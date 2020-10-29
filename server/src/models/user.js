const dayjs = require('dayjs')
const { Sequelize, DataTypes, Model } = require('sequelize')

/**
 * 
 * @param {Sequelize} sequelize 
 * @param {DataTypes} dataTypes 
 */
module.exports = (sequelize, dataTypes) => {
  const User = sequelize.define(
    'user',
    {
      uid: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: dataTypes.STRING,
        allowNull: false
      },
      password: {
        type: dataTypes.STRING,
        allowNull: false
      },
      nickname: {
        type: dataTypes.STRING,
        allowNull: false
      },
      eMail: {
        type: dataTypes.STRING
      },
      role: {
        type: dataTypes.INTEGER,  //root 0, admin 1, guest 2
        defaultValue: 2
      },
      avatar: {
        type: dataTypes.STRING
      },
      memo: {
        type: dataTypes.STRING
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
  User.associate = models => {
    User.hasMany(models.comment)
    User.hasMany(models.reply)
  }

  return User
}
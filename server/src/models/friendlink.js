const { Sequelize, DataTypes } = require('sequelize')
const dayjs = require('dayjs')

/**
 * 
 * @param {Sequelize} sequelize 
 * @param {DataTypes} dataTypes 
 */
module.exports = (sequelize, dataTypes) => {
  const FriendLink = sequelize.define(
    'friendlink',
    {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      link: {
        type: dataTypes.TEXT,
        allowNull: true
      },
      avatarLink: {
        type: dataTypes.TEXT,
        allowNull: true
      },
      title: {
        type: dataTypes.TEXT,
        allowNull: false
      },
      describe: {
        type: dataTypes.TEXT,
        allowNull: true
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

  return FriendLink
}

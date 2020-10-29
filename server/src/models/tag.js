const { Sequelize, DataTypes, Model } = require('sequelize')

/**
 * 
 * @param {Sequelize} sequelize
 * @param {DataTypes} dataTypes 
 */
module.exports = (sequelize, dataTypes) => {
  const Tag = sequelize.define(
    'tag',
    {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: dataTypes.TEXT,
        allowNull: false
      }
    }
  )

  /**
   * 
   * @param {Model} models 
   */
  Tag.associate = models => {
    Tag.belongsTo(models.article, {
      as: 'article',
      foreignKey: 'articleId',
      targetKey: 'id',
      constraints: false
    })
  }

  return Tag
}
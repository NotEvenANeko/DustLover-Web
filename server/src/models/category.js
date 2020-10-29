const { Sequelize, DataTypes, Model } = require('sequelize')

/**
 * 
 * @param {Sequelize} sequelize 
 * @param {DataTypes} dataTypes 
 */
module.exports = (sequelize, dataTypes) => {
  const Category = sequelize.define(
    'category',
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
  Category.associate = models => {
    Category.belongsTo(models.article, {
      as: 'article',
      foreignKey: 'articleId',
      targetKey: 'id',
      constraints: false
    })
  }

  return Category
}
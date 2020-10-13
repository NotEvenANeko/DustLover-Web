const Sequelize = require('sequelize')

module.exports = (sequelize, dataTypes = Sequelize.DataTypes) => {
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
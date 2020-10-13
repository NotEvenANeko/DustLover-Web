const Sequelize = require('sequelize')

module.exports = (sequelize, dataTypes = Sequelize.DataTypes) => {
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
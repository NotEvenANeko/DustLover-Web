module.exports = (sequelize, dataTypes) => {
  const OS = sequelize.define(
    'os',
    {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      type: {
        type: dataTypes.STRING,
        allowNull: false
      },
      count: {
        type: dataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false
      }
    }
  )

  return OS
}
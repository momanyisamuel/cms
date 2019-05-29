'use strict';
module.exports = (sequelize, DataTypes) => {
  const Portfolio = sequelize.define('Portfolio', {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    assetFlag: DataTypes.INTEGER,
    description: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    dateRecorded: DataTypes.STRING,
    refDetails: DataTypes.STRING,
    comment: DataTypes.STRING
  }, {});
  Portfolio.associate = function(models) {
    // associations can be defined here
    Portfolio.belongsTo(models.Chama)
  };
  return Portfolio;
};
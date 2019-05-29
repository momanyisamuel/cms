'use strict';
module.exports = (sequelize, DataTypes) => {
  const Goal = sequelize.define('Goal', {
    name: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    riskRanking: DataTypes.INTEGER
  }, {});
  Goal.associate = function(models) {
    // associations can be defined here
    Goal.belongsTo(models.Chama)
  };
  return Goal;
};
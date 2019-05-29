'use strict';
module.exports = (sequelize, DataTypes) => {
  const Votes = sequelize.define('Votes', {
    question: DataTypes.STRING,
    description: DataTypes.STRING,
    answer: DataTypes.INTEGER,
    pollDate: DataTypes.STRING
  }, {});
  Votes.associate = function(models) {
    // associations can be defined here
    Votes.belongsTo(models.Chama)
  };
  return Votes;
};
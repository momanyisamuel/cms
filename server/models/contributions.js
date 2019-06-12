'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contributions = sequelize.define('Contributions', {
    contributionDate: DataTypes.STRING,
    payRefNumber: DataTypes.STRING,
    contributionAmount: DataTypes.INTEGER,
    fundAssignment: DataTypes.STRING,
    comment: DataTypes.STRING
  }, {});
  Contributions.associate = function(models) {
    // associations can be defined here
   Contributions.belongsTo(models.User)
   Contributions.belongsTo(models.Chama)
    
  };
  return Contributions;
};
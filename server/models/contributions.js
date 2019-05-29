'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contributions = sequelize.define('Contributions', {
    depositDate: DataTypes.STRING,
    payRefNumber: DataTypes.INTEGER,
    depositAmount: DataTypes.INTEGER,
    fundAssignment: DataTypes.STRING,
    comment: DataTypes.STRING
  }, {});
  Contributions.associate = function(models) {
    // associations can be defined here
   Contributions.belongsTo(models.User)
    
  };
  return Contributions;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Fines = sequelize.define('Fines', {
    fineDate: DataTypes.STRING,
    fineCategory: DataTypes.STRING,
    fineAmount: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Fines.associate = function(models) {
    // associations can be defined here
    Fines.belongsTo(models.User)
    Fines.belongsTo(models.Chama)

  };
  return Fines;
};
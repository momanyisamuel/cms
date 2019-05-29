'use strict';
module.exports = (sequelize, DataTypes) => {
  const Loans = sequelize.define('Loans', {
    loanAmount: DataTypes.INTEGER,
    duration: DataTypes.INTEGER,
    interestRate: DataTypes.INTEGER
  }, {});
  Loans.associate = function(models) {
    // associations can be defined here
    Loans.belongsTo(models.User)

  };
  return Loans;
};
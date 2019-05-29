'use strict';
module.exports = (sequelize, DataTypes) => {
  const Withdrawals = sequelize.define('Withdrawals', {
    amount: DataTypes.INTEGER,
    withdrawalDate: DataTypes.STRING,
    withdrawRefNumber: DataTypes.INTEGER,
    withdrawalAmount: DataTypes.INTEGER,
    paymentPurpose: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {});
  Withdrawals.associate = function(models) {
    // associations can be defined here
    Withdrawals.belongsTo(models.User)

  };
  return Withdrawals;
};
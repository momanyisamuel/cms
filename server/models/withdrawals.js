'use strict';
module.exports = (sequelize, DataTypes) => {
  const Withdrawals = sequelize.define('Withdrawals', {
    withdrawalAmount: DataTypes.INTEGER,
    withdrawalDate: DataTypes.STRING,
    withdrawRefNumber: DataTypes.STRING,
    paymentPurpose: DataTypes.STRING,
    comment: DataTypes.STRING
  }, {});
  Withdrawals.associate = function(models) {
    // associations can be defined here
    Withdrawals.belongsTo(models.User)

  };
  return Withdrawals;
};
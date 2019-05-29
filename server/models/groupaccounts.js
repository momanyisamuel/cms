'use strict';
module.exports = (sequelize, DataTypes) => {
  const GroupAccounts = sequelize.define('GroupAccounts', {
    totalWithdrawals: DataTypes.INTEGER,
    totalContributions: DataTypes.INTEGER,
    totalAssets: DataTypes.INTEGER,
    totalLiabilities: DataTypes.INTEGER,
    totalLoans: DataTypes.INTEGER,
    totalFines: DataTypes.INTEGER
  }, {});
  GroupAccounts.associate = function(models) {
    // associations can be defined here
  };
  return GroupAccounts;
};

module.exports = (sequelize, DataTypes) => {
  const Chama = sequelize.define('Chama', {
    country: DataTypes.STRING,
    name: DataTypes.STRING,
    riskApetite: DataTypes.FLOAT
  }, {});
  Chama.associate = function(models) {
    // associations can be defined here
    Chama.hasMany(models.User)
    Chama.hasMany(models.Goal)
    Chama.hasMany(models.Portfolio)
    Chama.hasMany(models.GroupAccounts)
    Chama.hasMany(models.Poll)
    Chama.hasMany(models.Contributions)
    Chama.hasMany(models.Withdrawals)
    Chama.hasMany(models.Fines)
  };
  return Chama;
};

module.exports = (sequelize, DataTypes) => {
  const Chama = sequelize.define('Chama', {
    country: DataTypes.STRING,
    name: DataTypes.STRING,
    loan: DataTypes.STRING,
    riskApetite: DataTypes.INTEGER
  }, {});
  Chama.associate = function(models) {
    // associations can be defined here
    Chama.hasMany(models.User)
    Chama.hasMany(models.Goal)
    Chama.hasMany(models.Portfolio)
    Chama.hasMany(models.Votes)
    Chama.hasMany(models.GroupAccounts)
  };
  return Chama;
};
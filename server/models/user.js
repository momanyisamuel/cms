var bcrypt = require('bcrypt')

module.exports = function(sequelize, DataTypes){
	var User = sequelize.define('User', {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      phoneNumber: DataTypes.INTEGER,
      nationalId: DataTypes.STRING,
      email: DataTypes.STRING,
      userStatus: {
        type: DataTypes.INTEGER,       
        defaultValue: '0'
      },
      riskApetite: DataTypes.INTEGER,
      password: DataTypes.STRING,
      admin: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: '0'
      } 
    });
    
    User.associate = function(models) {
      User.hasMany(models.Poll)
      User.belongsTo(models.Chama)
      User.hasMany(models.Contributions)
      User.hasMany(models.Fines)
      User.hasMany(models.Loans)
      User.hasMany(models.Withdrawals)

    }
    return User;
}
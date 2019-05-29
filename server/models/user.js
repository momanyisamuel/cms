module.exports = function(sequelize, DataTypes){
	var User = sequelize.define('User', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        phoneNumber: DataTypes.INTEGER,
        nationalId: DataTypes.STRING,
        email: DataTypes.STRING,
        userStatus: DataTypes.INTEGER,
        password: DataTypes.STRING
      });
    
    return User;
}
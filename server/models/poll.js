module.exports = (sequelize, DataTypes) => {
    const Poll = sequelize.define('Poll', {
      question: DataTypes.STRING
    });
    Poll.associate = function(models) {
      // associations can be defined here
      Poll.hasMany(models.Choice);
      Poll.belongsTo(models.User);
     
    };
    return Poll;
  };
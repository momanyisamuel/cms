module.exports = (sequelize, Datatypes) => {
    const Choice = sequelize.define('Choice',{
        text: Datatypes.STRING
    })
    Choice.associate = function(models) {
        Choice.hasMany(models.Vote)
        Choice.belongsTo(models.Poll)
    }
    return Choice;
}
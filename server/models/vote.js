module.exports = (sequelize, Datatypes) => {
    const Vote = sequelize.define('Vote',{
    answer: Datatypes.STRING
    })

    Vote.associate = function(models) {
        Vote.belongsTo(models.Choice)
        Vote.belongsTo(models.User)
    }
    return Vote;
}
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Usuario = sequelize.define("Usuario", {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        privileges: DataTypes.BOOLEAN
    }/*, {
        classMethods: {
            associate: function(models) {
                Usuario.hasMany(models.Rol)
            }
        }
    }*/);
    return Usuario;
};


/*sequelize.sync({force: true}).then(function() {
 return Usuario.create({
 username: 'janedoe',
 password: 'pass123',
 email: 'janedoe@gmail.com',
 });
 }).then(function(jane) {
 console.log(jane.get({
 plain: true
 }));
 });*/
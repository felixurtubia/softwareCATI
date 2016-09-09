/**
 * Created by famancil on 21-08-16.
 */
"use strict";
var Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    var Rol = sequelize.define("Rol", {
        permiso: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Rol.belongsTo(models.Usuario, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });

    return Rol;
};

/**
 * Created by Felix-Urtubia on 11-09-16.
 */

"use strict";

var Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    var Contacto = sequelize.define("Contacto", {
        nombre: DataTypes.STRING,
    }, {
        classMethods: {
            proyectoAssociate: function(models) {
                BaseDatos.belongsTo(models.BaseDatos, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            },
            contactoAssociate: function (models) {
                BaseDatos.hasMany(models.Respuesta, {
                    onDelete: "CASCADE",
                    foreignKey:{
                        allowNull: false
                    }
                });

            }
        }
    });

    return Contacto;
};
/**
 * Created by Felix-Urtubia on 11-09-16.
 */

"use strict";

var Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    var Contacto = sequelize.define("Contacto", {
        name: DataTypes.STRING,
        lastname: DataTypes.STRING,
        number: DataTypes.STRING,
        state: DataTypes.STRING,
        basededatos: DataTypes.STRING
    }, {
        classMethods: {
            baseDatos_contactoAssociate: function(models) {
                Contacto.belongsTo(models.BaseDatos, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            },
            respuesta_contactoAssociate: function (models) {
                Contacto.hasMany(models.Respuesta, {
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
/**
 * Created by Felix-Urtubia on 11-09-16.
 */

"use strict";

var Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    var BaseDatos = sequelize.define("BaseDatos", {
        nombre: DataTypes.STRING,
    }, {
        classMethods: {
            proyectoAssociate: function(models) {
                BaseDatos.belongsTo(models.Proyecto, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            },
            contactoAssociate: function (models) {
                BaseDatos.hasMany(models.Contacto, {
                    onDelete: "CASCADE",
                    foreignKey:{
                        allowNull: false
                    }
                });

            }
        }
    });

    return BaseDatos;
};

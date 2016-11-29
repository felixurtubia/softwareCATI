/**
 * Created by Felix-Urtubia on 09-09-16.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Encuesta = sequelize.define("Encuesta", {
        nombre_Encuesta: DataTypes.STRING,
        link_Encuesta: DataTypes.STRING,
        proyectoid: DataTypes.INTEGER

    },{
        classMethods: {
            encuesta_preguntaAssociate: function (models) {
                Encuesta.hasMany(models.Pregunta, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            },

            encuesta_llamadaAssociate: function (models) {
                Encuesta.hasMany(models.Llamada, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });
    return Encuesta;
};

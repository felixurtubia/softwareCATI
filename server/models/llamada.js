/**
 * Created by Felix-Urtubia on 09-09-16.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Llamada = sequelize.define("Llamada", {
        nombre_Encuesta: DataTypes.STRING,
        numero_destino: DataTypes.INTEGER,
        termino_llamada: DataTypes.DATE,
        encuestaid: DataTypes.INTEGER,
        grabacionid: DataTypes.INTEGER

    },{
        classMethods: {
            llamada_grabacionllamadaAssociate: function (models) {
                Llamada.hasOne(models.Grabacionllamada, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            },

            encuesta_llamadaAssociate: function (models) {
                Llamada.hasMany(models.Encuesta, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });
    return Llamada;
};

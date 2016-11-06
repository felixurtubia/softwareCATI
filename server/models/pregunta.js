/**
 * Created by Felix-Urtubia on 09-09-16.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Pregunta = sequelize.define("Pregunta", {
        pregunta: DataTypes.STRING,
        numero_Pregunta: DataTypes.INTEGER,
        encuestaid: DataTypes.INTEGER

    },{
        classMethods: {
            encuesta_preguntaAssociate: function (models) {
                Pregunta.belongsTo(models.Encuesta, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            },

            pregunta_respuestaAssociate: function (models) {
                Pregunta.hasMany(models.Respuesta, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });
    return Pregunta;
};
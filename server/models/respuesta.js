/**
 * Created by Felix-Urtubia on 09-09-16.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Respuesta = sequelize.define("Respuesta", {
        respuesta: DataTypes.STRING,
        contactoid: DataTypes.INTEGER,
        preguntaid: DataTypes.INTEGER

    },{
        classMethods: {
            respuesta_contactoAssociate: function (models) {
                Respuesta.belongsTo(models.Contacto, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            },

            pregunta_respuestaAssociate: function (models) {
                Respuesta.belongsTo(models.Pregunta, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });
    return Respuesta;
};
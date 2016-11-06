/**
 * Created by Felix-Urtubia on 09-09-16.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var GrabacionLlamada = sequelize.define("GrabacionLlamada", {
        duracion: DataTypes.INTEGER
    },{
        classMethods: {
            llamada_grabacionllamadaAssociate: function (models) {
                GrabacionLlamada.hasOne(models.Llamada, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });
    return GrabacionLlamada;
};

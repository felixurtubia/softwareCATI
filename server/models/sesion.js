/**
 * Created by Felix-Urtubia on 09-09-16.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Sesion = sequelize.define("Sesion", {
        fin_sesion: DataTypes.DATE,
        usuarioid: DataTypes.INTEGER

    },{
        classMethods: {
            /*
            sesion_usuarioAssociate: function (models) {
                Sesion.belongsTo(models.Encuesta, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            },
            */

            sesion_errorAssociate: function (models) {
                Sesion.hasMany(models.Error, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });
    return Sesion;
};

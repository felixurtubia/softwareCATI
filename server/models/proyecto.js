/**
 * Created by Felix-Urtubia on 09-09-16.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Proyecto = sequelize.define("Proyecto", {
        nombre: DataTypes.STRING,
        creador: DataTypes.STRING

    },{
        classMethods: {
            proyecto_baseDatosAssociate: function (models) {
                BaseDatos.belongsTo(models.Proyecto, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });
    return Proyecto;
};

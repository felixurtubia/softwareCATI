/**
 * Created by Felix-Urtubia on 09-09-16.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Error = sequelize.define("Error", {
        tipo: DataTypes.STRING,
        sesionid: DataTypes.INTEGER

    },{
        classMethods: {
            sesion_errorAssociate: function (models) {
                Error.belongsTo(models.Sesion, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });
    return Error;
};

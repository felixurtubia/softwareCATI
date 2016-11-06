"use strict";

module.exports = function(sequelize, DataTypes) {
    var Usuario = sequelize.define("Usuario", {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        privileges: DataTypes.BOOLEAN
    }/*, {
        classMethods: {
                sesion_usuarioAssociate: function (models) {
                 Sesion.belongsTo(models.Encuesta, {
                        onDelete: "CASCADE",
                        foreignKey: {
                                    allowNull: false
                                    }
            });
     },
            }
        }
    }*/

    );
    return Usuario;
};


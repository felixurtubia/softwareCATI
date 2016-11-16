"use strict";

module.exports = function(sequelize, DataTypes) {
    var Audio = sequelize.define("Audio", {
            nombre: DataTypes.STRING,
            duracion: DataTypes.STRING,
        }

    );
    return Audio;
};

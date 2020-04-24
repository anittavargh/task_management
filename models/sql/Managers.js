'use strict';
module.exports = (sequelize, DataTypes) => {
    const Managers = sequelize.define('managers', {
        managers_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        userName: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        phoneNumber: {
            type: DataTypes.STRING,
        },
        emailAddress: {
            type: DataTypes.STRING,
        }

    });
    return Managers;
};
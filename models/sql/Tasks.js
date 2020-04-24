'use strict';
module.exports = (sequelize, DataTypes) => {
    const Tasks = sequelize.define('tasks', {
        tasks_id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING, 
        },
        description: {
            type: DataTypes.STRING
        },
        dueDate: {
            type: DataTypes.DATE,
        },
        status: {
            type: DataTypes.ENUM('1','2','3'),
        },
        managers_id: {
            type: DataTypes.INTEGER,
        },
    });
    Tasks.associate = (models) => {
        Tasks.belongsTo(models.managers, {
            foreignKey: 'managers_id',
            targetKey: 'managers_id'
        });
    };
    return Tasks;
};
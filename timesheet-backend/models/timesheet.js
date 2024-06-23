// models/timesheet.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Project = require('./project');

const Timesheet = sequelize.define('Timesheet', {
    projectId: {
        type: DataTypes.INTEGER,
        references: {
            model: Project,
            key: 'id'
        }
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hours: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

Timesheet.belongsTo(Project, { foreignKey: 'projectId' });

module.exports = Timesheet;

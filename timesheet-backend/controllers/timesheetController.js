// controllers/timesheetController.js
const Timesheet = require('../models/timesheet');
const Project = require('../models/project');

exports.createTimesheet = async (req, res) => {
    try {
        const timesheet = await Timesheet.create(req.body);
        res.status(201).json(timesheet);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getTimesheets = async (req, res) => {
    try {
        const timesheets = await Timesheet.findAll({ include: Project });
        res.status(200).json(timesheets);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Calculate overtime
exports.calculateOvertime = (timesheets) => {
    // Implement overtime calculation logic here
};

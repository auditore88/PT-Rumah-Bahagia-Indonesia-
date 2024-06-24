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

exports.updateTimesheet = async (req, res) => {
    const { id } = req.params;
    const { projectId, date, hours } = req.body;

    try {
        const timesheet = await Timesheet.findByPk(id);
        if (!timesheet) {
            return res.status(404).send({ message: "Timesheet not found" });
        }
        timesheet.projectId = projectId;
        timesheet.date = date;
        timesheet.hours = hours;
        await timesheet.save();

        res.send(timesheet);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.deleteTimesheet = async (req, res) => {
    const { id } = req.params;

    try {
        const timesheet = await Timesheet.findByPk(id);
        if (!timesheet) {
            return res.status(404).send({ message: "Timesheet not found" });
        }
        await timesheet.destroy();

        res.send({ message: "Timesheet deleted successfully" });
    } catch (error) {
        res.status(500).send(error);
    }
};

// Calculate overtime
exports.calculateOvertime = (timesheets) => {
    const overtimeRate = 1.3;
    let totalOvertimeHours = 0;
    let totalOvertimePayment = 0;

    timesheets.forEach(timesheet => {
        const { hours, date, Project } = timesheet;
        const workHours = Math.min(8, hours);
        const overtimeHours = Math.max(0, hours - workHours);
        const overtimePayment = overtimeHours * Project.rate * overtimeRate;

        totalOvertimeHours += overtimeHours;
        totalOvertimePayment += overtimePayment;
    });

    return { totalOvertimeHours, totalOvertimePayment };
};

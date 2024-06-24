const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const timesheetController = require('../controllers/timesheetController');

// Project routes
router.get('/projects', projectController.getProjects);
router.post('/projects', projectController.createProject);
router.put('/projects/:id', projectController.updateProject); // Update project
router.delete('/projects/:id', projectController.deleteProject); // Delete project

// Timesheet routes
router.get('/timesheets', timesheetController.getTimesheets);
router.post('/timesheets', timesheetController.createTimesheet);
router.put('/timesheets/:id', timesheetController.updateTimesheet); // Update timesheet
router.delete('/timesheets/:id', timesheetController.deleteTimesheet); // Delete timesheet

module.exports = router;

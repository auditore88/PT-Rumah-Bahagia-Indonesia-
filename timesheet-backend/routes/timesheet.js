// routes/timesheet.js
const express = require('express');
const router = express.Router();
const timesheetController = require('../controllers/timesheetController');

router.post('/', timesheetController.createTimesheet);
router.get('/', timesheetController.getTimesheets);

module.exports = router;

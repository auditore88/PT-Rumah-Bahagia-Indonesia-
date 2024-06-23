// controllers/timesheetController.js
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

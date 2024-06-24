const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const projectRoutes = require('./routes/project');
const timesheetRoutes = require('./routes/timesheet');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/projects', projectRoutes);
app.use('/timesheets', timesheetRoutes);

sequelize.sync().then(() => {
    app.listen(4000, () => {
        console.log('Server is running on port 4000');
    });
});

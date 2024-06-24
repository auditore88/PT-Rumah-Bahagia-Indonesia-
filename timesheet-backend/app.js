const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const routes = require('./routes/index');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('', routes);

sequelize.sync().then(() => {
    app.listen(4000, () => {
        console.log('Server is running on port 4000');
    });
});

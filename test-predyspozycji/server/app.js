const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')

const answersRoutes = require('./routes/answers')

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use('/api/answers/', answersRoutes)

module.exports = app;
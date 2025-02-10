const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')


const answersRoutes = require('./routes/answers')
const questionsRoutes = require('./routes/questions')
const resultsRoutes = require('./routes/result')
const studyFieldsRoutes = require('./routes/study-fields')
const candidatesRoutes = require('./routes/candidates')
const authRoutes = require('./routes/auth')
const mailRoutes = require('./routes/mail')

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use('/api/answers/', answersRoutes)
app.use('/api/questions/', questionsRoutes)
app.use('/api/results/', resultsRoutes)
app.use('/api/study-fields/', studyFieldsRoutes)
app.use('/api/candidates/', candidatesRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/mail/', mailRoutes)

module.exports = app;
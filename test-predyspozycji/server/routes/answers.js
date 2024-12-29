const express = require('express')

const router = express.Router()

const AnswersControllers = require('../controllers/answers')

router.post('/save', AnswersControllers.saveAnswers)

router.get('/results', AnswersControllers.getResults)

module.exports = router
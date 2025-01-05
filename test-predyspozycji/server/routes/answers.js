const express = require('express')

const router = express.Router()

const AnswersControllers = require('../controllers/answers')

router.post('/save', AnswersControllers.saveAnswers)

router.get('/results', AnswersControllers.getResults)

router.get('', AnswersControllers.getAnswers)

router.get('/reset', AnswersControllers.resetAnswers)

module.exports = router
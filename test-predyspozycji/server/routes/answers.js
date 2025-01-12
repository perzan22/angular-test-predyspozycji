const express = require('express')

const router = express.Router()

const AnswersControllers = require('../controllers/answers')

router.post('/save', AnswersControllers.saveAnswers)

router.get('', AnswersControllers.getAnswers)

router.get('/reset', AnswersControllers.resetAnswers)

router.get('/all', AnswersControllers.getAllAnswers)

router.patch('', AnswersControllers.editAnswer)

module.exports = router
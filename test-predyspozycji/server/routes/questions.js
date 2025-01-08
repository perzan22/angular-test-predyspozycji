const express = require('express')

const router = express.Router()

const QuestionsControllers = require('../controllers/questions')

router.get('', QuestionsControllers.getQuestions)

router.get('/edit', QuestionsControllers.getQuestion)

module.exports = router
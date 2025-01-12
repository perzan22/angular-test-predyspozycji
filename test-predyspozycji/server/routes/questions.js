const express = require('express')

const router = express.Router()

const QuestionsControllers = require('../controllers/questions')

router.get('', QuestionsControllers.getQuestions)

router.get('/edit', QuestionsControllers.getQuestion)

router.patch('', QuestionsControllers.editQuestion)

module.exports = router
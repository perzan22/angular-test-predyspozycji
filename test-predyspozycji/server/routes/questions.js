const express = require('express')

const router = express.Router()

const QuestionsControllers = require('../controllers/questions')

router.get('', QuestionsControllers.getQuestions)

module.exports = router
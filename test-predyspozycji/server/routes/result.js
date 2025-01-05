const express = require('express')

const router = express.Router()

const ResultControllers = require('../controllers/result')

router.get('', ResultControllers.getResults)

module.exports = router
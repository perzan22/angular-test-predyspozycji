const express = require('express')

const router = express.Router()

const ResultControllers = require('../controllers/result')

router.get('', ResultControllers.getTestResult)

router.post('', ResultControllers.addNewResult)

module.exports = router
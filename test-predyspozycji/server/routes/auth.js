const express = require('express')

const router = express.Router()

const AuthControllers = require('../controllers/auth')

router.post('', AuthControllers.login)

module.exports = router
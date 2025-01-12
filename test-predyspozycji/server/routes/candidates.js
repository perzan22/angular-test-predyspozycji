const express = require('express')

const router = express.Router()

const CandidateControllers = require('../controllers/candidates')

router.post('', CandidateControllers.createCandidate)

router.get('', CandidateControllers.getCandidates)

router.delete('', CandidateControllers.deleteCandidate)

module.exports = router
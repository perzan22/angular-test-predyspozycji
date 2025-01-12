const express = require('express')

const router = express.Router()

const StudyFieldsControllers = require('../controllers/study-fields')

router.get('', StudyFieldsControllers.getStudyFields)

router.get('/edit', StudyFieldsControllers.getStudyField)

router.post('', StudyFieldsControllers.addStudyField)

router.patch('', StudyFieldsControllers.editStudyField)

router.delete('', StudyFieldsControllers.deleteStudyField)

module.exports = router
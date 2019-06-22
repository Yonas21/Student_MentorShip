const express = require('express');
const router = express.Router();
const reportController  = require('../controllers/report');

//find out all students registered
router.get('/', reportController.get_all_reports);

//find individual students
router.get('/:reportId', reportController.get_a_report);

//register a student
router.post('/', reportController.create_a_report);

router.delete('/:reportId', reportController.delete_a_report);

module.exports = router;

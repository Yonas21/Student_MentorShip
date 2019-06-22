const express = require('express');
const router = express.Router();
const logController  = require('../controllers/log');

//find out all students registered
router.get('/', logController.get_all_log);

//find individual students
router.get('/:logId', logController.get_a_log);

//register a student
router.post('/', logController.create_a_log);

router.delete('/:logId', logController.delete_a_log);

module.exports = router;

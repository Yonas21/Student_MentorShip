const supervisorController = require('../controllers/supervisor');
const express = require('express');
const router = express.Router();

//find out all students registered
router.get('/', supervisorController.get_all_supervisors);

//find individual students
router.get('/:supervisorId', supervisorController.get_a_supervisor);

//register a student
router.post('/', supervisorController.register_Supervisor);

router.delete('/:supervisorId', supervisorController.delete_an_supervisor);

module.exports = router;

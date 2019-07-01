const supervisorController = require('../controllers/supervisor');
const express = require('express');
const router = express.Router();

//find out all students registered
router.get('/', supervisorController.get_all_supervisors);

//find individual students
// router.get('/:supervisorId', supervisorController.get_a_supervisor);

//register a student
router.post('/', supervisorController.register_Supervisor);

router.post('/authenticate_supervisor', supervisorController.authenticate_supervisor);

router.delete('/:supervisorId', supervisorController.delete_an_supervisor);

router.get('/:supervisorId', supervisorController.get_student_from_a_supervisor);

module.exports = router;

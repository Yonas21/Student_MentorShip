const express = require('express');
const router = express.Router();
const studentController  = require('../controllers/student');

//find out all students registered
router.get('/', studentController.get_all_students);

//find individual students
router.get('/:studentId', studentController.get_a_student);

//register a student
router.post('/', studentController.register_student);

//login into student account
router.post('/authenticate_student',studentController.authenticate_student);

router.delete('/:studentId', studentController.delete_a_student);

module.exports = router;

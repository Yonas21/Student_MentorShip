const teacherController = require('../controllers/teacher');
const express = require('express');
const router = express.Router();

//find out all students registered
router.get('/', teacherController.get_all_teachers);

//find individual students
router.get('/:teacherId', teacherController.get_a_teacher);

//register a student
router.post('/', teacherController.register_teacher);

router.delete('/:teacherId', teacherController.remove_teacher);

module.exports = router;

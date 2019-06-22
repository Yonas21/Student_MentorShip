const evaluatorController = require('../controllers/evaluator');
const express = require('express');
const router = express.Router();

//find out all students registered
router.get('/', evaluatorController.get_all_evaluators);

//find individual students
router.get('/:evaluatorId', evaluatorController.get_an_evaluator);

//register a student
router.post('/', evaluatorController.register_evaluator);

router.post('/authenticate_evaluator', evaluatorController.authenticate_evaluator);

router.delete('/:evaluatorId', evaluatorController.delete_an_evaluator);

module.exports = router;

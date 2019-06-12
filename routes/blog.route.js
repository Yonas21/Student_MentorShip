const express = require('express');
const router = express.Router();
const blogController  = require('../controllers/blog');

//find out all students registered
router.get('/', blogController.get_all_blogs);

//find individual students
router.get('/:blogId', blogController.get_a_blog);

//register a student
router.post('/', blogController.create_a_blog);

router.delete('/:blogId', blogController.delete_a_blog);

module.exports = router;

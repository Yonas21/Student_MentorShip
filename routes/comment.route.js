const express = require('express');
const router = express.Router();
const commentController  = require('../controllers/comment');
// find all route
router.get('/', commentController.get_all_comments);

//get one comment route
router.get('/:commentId', commentController.get_a_comment);

//give or comment route
router.post('/', commentController.give_a_comment);

router.delete('/:commentId', commentController.remove_a_comment);

module.exports = router;

const mongoose = require('mongoose');
const Comment = require('../models/comment.model');

exports.get_all_comments = (req, res, next) => {
    Comment.find()
        .select("commented_by comment date")
        .exec()
        .then(comments => {
            res.status(200).json({
                message: `comments founds`,
                result: comments
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'unable to find any comment',
                error: err
            })
        })
};

exports.get_a_comment = (req, res, next) => {
    let id = req.params.commentId;
    Comment.findById(id)
        .select("commented_by comment date")
        .exec()
        .then(comment => {
            res.status(200).json({
                message: `a comment found`,
                result: comment
            })
        })
        .catch(err => {
            res.status(404).json({
                message: `unable to find comment with id ${id}`,
                error: err
            })
        })
};

exports.give_a_comment = (req, res, next) => {
    let comment = new Comment({
        _id: mongoose.Schema.ObjectId(),
        commented_by : req.body.user,
        comment: req.body.comment,
        date: req.body.date
    });

    comment.save()
        .then(result => {
            res.status(200).json({
                message: 'comment added',
                result: result
            })
        })
        .catch(err => {
            res.status(500).json({
                message: `unable to add comment`,
                error: err
            })
        })
};

exports.remove_a_comment = (req, res, next) => {
    let id = req.params.commentId;
    Comment.findByIdAndDelete(id)
        .then(result => {
            res.status(200).json({
                message: `comment with id ${id} successfully deleted`,
                result: result
            })
        })
        .catch(err => {
            res.status(404).json({
                message: `no comment with Id ${id}`,
                error: err
            })
        })
};

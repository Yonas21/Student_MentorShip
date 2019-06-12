const mongoose = require('mongoose');
const Blog = require('../models/blog.model');

exports.get_all_blogs = (req, res, next) => {
    Blog.find()
        .exec()
        .then(blogs => {
            res.status(200).json({
                message: 'blog found',
                result: blogs
            })
        })
        .catch(err => {
            res.status(404).json({
                message: 'unable to find any blog',
                error: err
            })
        });
};

exports.get_a_blog = (req, res, next) => {
    let id = req.params.blogId;
    Blog.findById(id)
        .exec()
        .then(blog => {
            res.status(200).json({
                message: 'a blog found',
                result: blog
            })
        })
        .catch(err => {
            res.status(404).json({
                message: `no student with id ${id}`,
                error: err
            })
        });
};

exports.create_a_blog = (req, res, next) => {
    let blog = new Blog({
        date: req.body.date,
        blog: req.body.blog
    });
    blog.save()
        .then(result => {
            res.status(201).json({
                message: 'Blog saved successfully',
                result: result
            })
        })
        .catch(err => {
            res.status(500).json({
                message: `unable to create a blog`,
                error: err
            })
        })
};

exports.delete_a_blog = (req, res, next) => {
    let id = req.params.blogId;

    Blog.findByIdAndRemove(id)
        .exec()
        .then(result => {
            res.status(200).json({
                message: `Blog with id ${id} successfully deleted`,
                result: result
            })
        })
        .catch(err => {
            res.status(404).json({
                message: 'unable to delete student',
                error: err
            })
        })
};

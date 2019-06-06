const mongoose = require('mongoose');
const Student = require('../models/student.model');

exports.get_all_students = (req, res, next) => {
    Student.find()
        .exec()
        .then(students => {
            res.status(200).json({
                message: 'students found',
                result: students
            })
        })
        .catch(err => {
            res.status(404).json({
                message: 'unable to find any student',
                error: err
            })
        });
};
exports.get_a_student = (req, res, next) => {
    let id = req.params.studentId;
    Student.findById(id)
        .exec()
        .then(student => {
            res.status(200).json({
                message: 'a student found',
                result: student
            })
        })
        .catch(err => {
            res.status(404).json({
                message: `no student with id ${id}`,
                error: err
            })
        });
};

exports.register_student = (req, res, next) => {
    let username = Math.random();
    let password = 'STU' + Math.random();
    let student = new Student({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        school: req.body.school,
        username,
        password,
    });
    student.save()
        .then(result => {
            res.status(201).json({
                message: 'student registered successfully',
                result: result
            })
        })
        .catch(err => {
            res.status(500).json({
                message: `unable to register student`,
                error: err
            })
        })
};

exports.delete_a_student = (req, res, next) => {
    let id = req.params.studentId;
    Student.findByIdAndRemove(id)
        .exec()
        .then(result => {
            res.status(200).json({
                message: `student with id ${id} successfully deleted`,
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

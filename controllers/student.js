const mongoose = require('mongoose');
const Student = require('../models/student.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.get_all_students = (req, res, next) => {
    Student.find()
        .select("username password firstName lastName school role")
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
        .select("username password firstName lastName school")
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
    let username = 'STU-' + Math.floor(Math.random() * 10000).toFixed(0);
    let password = Math.floor(Math.random() * 10000).toFixed(0);
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        } else {
            let student = new Student({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                school: req.body.school,
                username: username,
                password: hashedPassword
            });
            student.save()
                .then(result => {
                    res.status(201).json({
                        message: 'student registered successfully',
                        result: result,
                        password: password
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        message: `unable to register student`,
                        error: err
                    })
                })
        }
    });

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

exports.authenticate_student = (req, res, next) => {
    Student.find({ username: req.body.username })
        .exec()
        .then((user) => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Authorization Failed'
                });
            } else {
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {

                    if (err) {
                        return res.status(401).json({
                            message: 'Authorization Failed'
                        });
                        console.log(`${req.body.email} + ${req.body.password}`);
                    }
                    if (result) {
                        const payload = {
                            email: user[0].email,
                            userId: user[0]._id,
                            role: user[0].role,
                            name: user[0].firstName
                        };
                        const token = jwt.sign(payload, process.env.JWT_SECRET ,
                            {
                                expiresIn: "12h"
                            });
                        //let decoded  = jwt_decoded(token);
                        return res.status(200).json({
                            message: 'Authorized',
                            token: token,
                            role: payload.role,
                            username: payload.name
                        });
                    }


                    res.status(401).json({
                        message: 'Authorization Failed'
                    });
                    console.log(`${req.body.username} + ${req.body.password}`)
                })
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
};


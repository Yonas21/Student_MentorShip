const Evaluator = require('../models/evaluator.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.get_all_evaluators = (req, res, next) => {
    Evaluator.find()
        .select("phoneNo password email address firstName lastName")
        .exec()
        .then(evaluators => {
            res.status(200).json({
                message: 'Evaluators found',
                result: evaluators
            })
        })
        .catch(err => {
            res.status(404).json({
                message: 'unable to find any Evaluator',
                error: err
            })
        });
};
exports.get_an_evaluator = (req, res, next) => {
    let id = req.params.evaluatorId;
    Evaluator.findById(id)
        .select("phoneNo password email address firstName lastName")
        .exec()
        .then(evaluator => {
            res.status(200).json({
                message: 'Evaluator found',
                result: evaluator
            })
        })
        .catch(err => {
            res.status(404).json({
                message: `no Evaluator with id ${id}`,
                error: err
            })
        });
};

exports.register_evaluator = (req, res, next) => {
    let pass = req.body.password;
    bcrypt.hash(pass, 10, (err, hashedPass) => {
        if (err) {
            req.status(500).json({
                error: err
            })
        } else {
            let evaluator = new Evaluator({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phoneNo: req.body.phoneNo,
                email: req.body.email,
                address: req.body.address,
                password: hashedPass
            });
            evaluator.save()
                .then(result => {
                    res.status(201).json({
                        message: 'Evaluator registered successfully',
                        result: result
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        message: `unable to register Evaluator`,
                        error: err
                    })
                })
        }
    })

};

exports.delete_an_evaluator = (req, res, next) => {
    let id = req.params.evaluatorId;
    Evaluator.findByIdAndRemove(id)
        .exec()
        .then(result => {
            res.status(200).json({
                message: `Evaluator with id ${id} successfully deleted`,
                result: result
            })
        })
        .catch(err => {
            res.status(404).json({
                message: 'unable to delete Evaluator',
                error: err
            })
        })
};
exports.authenticate_evaluator = (req, res, next) => {
    Evaluator.find({ email: req.body.email })
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
                    console.log(`${req.body.email} + ${req.body.password}`)
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

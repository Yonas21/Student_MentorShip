const Supervisor = require('../models/supervisor.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.get_all_supervisors = (req, res, next) => {
    Supervisor.find()
        .select("phoneNo password email address firstName lastName")
        .exec()
        .then(Supervisors => {
            res.status(200).json({
                message: 'Supervisors found',
                result: Supervisors
            })
        })
        .catch(err => {
            res.status(404).json({
                message: 'unable to find any Supervisor',
                error: err
            })
        });
};
exports.get_a_supervisor = (req, res, next) => {
    let id = req.params.supervisorId;
    Supervisor.findById(id)
        .select("phoneNo password email address firstName lastName")
        .exec()
        .then(supervisor => {
            res.status(200).json({
                message: 'Supervisor found',
                result: supervisor
            })
        })
        .catch(err => {
            res.status(404).json({
                message: `no Supervisor with id ${id}`,
                error: err
            })
        });
};

exports.register_Supervisor = (req, res, next) => {
    let pass = req.body.password;
    bcrypt.hash(pass, 10, (err, hashedPass) => {
        if (err) {
            res.status(500).json({
                error: err
            })
        } else {
            let supervisor = new Supervisor({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phoneNo: req.body.phoneNo,
                email: req.body.email,
                address: req.body.address,
                password: hashedPass
            });
            supervisor.save()
                .then(result => {
                    res.status(201).json({
                        message: 'Supervisor registered successfully',
                        result: result
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        message: `unable to register Supervisor`,
                        error: err
                    })
                })
        }
    })

};

exports.delete_an_supervisor = (req, res, next) => {
    let id = req.params.supervisorId;
    Supervisor.findByIdAndRemove(id)
        .exec()
        .then(result => {
            res.status(200).json({
                message: `Supervisor with id ${id} successfully deleted`,
                result: result
            })
        })
        .catch(err => {
            res.status(404).json({
                message: 'unable to delete Supervisor',
                error: err
            })
        })
};
exports.authenticate_supervisor = (req, res, next) => {
    Supervisor.find({ email: req.body.email })
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

const Evaluator = require('../models/evaluator.model');

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
exports.get_a_evaluator = (req, res, next) => {
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

    let evaluator = new Evaluator({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNo: req.body.phoneNo,
        email: req.body.email,
        address: req.body.address,
        password: req.body.password
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

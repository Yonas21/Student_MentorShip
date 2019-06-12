const Supervisor = require('../models/supervisor.model');

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

    let supervisor = new Supervisor({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNo: req.body.phoneNo,
        email: req.body.email,
        address: req.body.address,
        password: req.body.password
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

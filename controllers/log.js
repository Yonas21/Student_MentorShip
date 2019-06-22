const mongoose = require('mongoose');
const Log = require('../models/log.model');

exports.get_all_log = (req, res, next) => {
    Log.find()
        .select("report date")
        .exec()
        .then(logs => {
            res.status(200).json({
                message: 'report found',
                result: logs
            })
        })
        .catch(err => {
            res.status(404).json({
                message: 'unable to find any log',
                error: err
            })
        });
};

exports.get_a_log = (req, res, next) => {
    let id = req.params.logId;
    log.findById(id)
        .select("log date")
        .exec()
        .then(log => {
            res.status(200).json({
                message: 'a log found',
                result: log
            })
        })
        .catch(err => {
            res.status(404).json({
                message: `no student with id ${id}`,
                error: err
            })
        });
};

exports.create_a_log = (req, res, next) => {
    let log = new Log({
        userActivities: req.body.userActivities
    });
    log.save()
        .then(result => {
            res.status(201).json({
                message: 'Log saved successfully',
                result: result
            })
        })
        .catch(err => {
            res.status(500).json({
                message: `unable to create a log`,
                error: err
            })
        })
};

exports.delete_a_log = (req, res, next) => {
    let id = req.params.logId;
    console.log(id);
    Log.findByIdAndRemove(id)
        .exec()
        .then(result => {
            res.status(200).json({
                message: `Log with id ${id} successfully deleted`,
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

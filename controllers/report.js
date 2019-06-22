const mongoose = require('mongoose');
const Report = require('../models/report.model');

exports.get_all_reports = (req, res, next) => {
    Report.find()
        .exec()
        .then(reports => {
            res.status(200).json({
                message: 'report found',
                result: reports
            })
        })
        .catch(err => {
            res.status(404).json({
                message: 'unable to find any report',
                error: err
            })
        });
};

exports.get_a_report = (req, res, next) => {
    let id = req.params.reportId;
    Report.findById(id)
        .select("report date")
        .exec()
        .then(report => {
            res.status(200).json({
                message: 'a report found',
                result: report
            })
        })
        .catch(err => {
            res.status(404).json({
                message: `no student with id ${id}`,
                error: err
            })
        });
};

exports.create_a_report = (req, res, next) => {

    // console.log(req.files['image']);

    let report = new Report({
        numberOfStudents: req.body.numberOfStudents,
        dateOfReport: req.body.dateOfReport,
        image: req.files['image'],
        video: req.files['video'][0].path,
        text: req.body.text
    });
    report.save()
        .then(result => {
            res.status(201).json({
                message: 'report saved successfully',
                result: result
            })
        })
        .catch(err => {
            res.status(500).json({
                message: `unable to create a report`,
                error: err
            })
        })
};

exports.delete_a_report = (req, res, next) => {
    let id = req.params.reportId;
    console.log(id);
    Report.findByIdAndRemove(id)
        .exec()
        .then(result => {
            res.status(200).json({
                message: `report with id ${id} successfully deleted`,
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

const Teacher = require('../models/teacher.model');

exports.get_all_teachers = (req, res, next) => {
    Teacher.find()
        .exec()
        .then(teachers => {
            res.status(200).json({
                message: 'teachers found',
                result: teachers
            })
        })
        .catch(err => {
            res.status(404).json({
                message: 'no result found',
                error: err
            })
        })
};

exports.get_a_teacher = (req, res, next) => {
    let id = req.params.teacherId;
    Teacher.findById(id)
        .exec()
        .then(teacher => {
            res.status(200).json({
                message: 'teacher found',
                result: teacher
            })
        })
        .catch(err => {
            res.status(404).json({
                message: `no teacher with id of ${id}`,
                error: err
            })
        })
};
exports.register_teacher = (req, res, next) => {
    let teacher = new Teacher({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNo: req.body.phoneNo,
        email: req.body.email,
        studyAt: req.body.studyAt,
        field: req.body.field,
        interest: req.body.interest
    });

    teacher.save()
        .then(result => {
            res.status(201).json({
                message: 'Teacher registered successfully',
                result: result
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'unable to register teacher',
                error: err
            })
        })
};
exports.remove_teacher = (req, res, next) => {
    let id = req.params.teacherId;
    Teacher.findByIdAndRemove(id)
        .then(result => {
            res.status(200).json({
                message: `teacher with id of ${id} successfully removed`,
                result: result
            })
        })
        .catch(err => {
            res.status(404).json({
                message: `no teacher with id of ${id}`,
                error: err
            })
        })
};

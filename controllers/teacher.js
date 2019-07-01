const Teacher = require("../models/teacher.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const reportController = require("./report");
const blogController = require("./blog");

exports.get_all_teachers = (req, res, next) => {
  Teacher.find()
    .exec()
    .then(teachers => {
      res.status(200).json({
        message: "teachers found",
        result: teachers
      });
    })
    .catch(err => {
      res.status(404).json({
        message: "no result found",
        error: err
      });
    });
};

exports.get_a_teacher = (req, res, next) => {
  let id = req.params.teacherId;
  Teacher.findById(id)
    .exec()
    .then(teacher => {
      res.status(200).json({
        message: "teacher found",
        result: teacher
      });
    })
    .catch(err => {
      res.status(404).json({
        message: `no teacher with id of ${id}`,
        error: err
      });
    });
};
exports.register_teacher = (req, res, next) => {
  let password = Math.floor(Math.random() * 10000).toFixed(0);
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      res.status(500).json({
        error: err
      });
    } else {
      let teacher = new Teacher({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNo: req.body.phoneNo,
        email: req.body.email,
        studyAt: req.body.studyAt,
        field: req.body.field,
        interest: req.body.interest,
        password: hashedPassword
      });

      teacher
        .save()
        .then(result => {
          res.status(201).json({
            message: "Teacher registered successfully",
            result: result,
            password: password
          });
        })
        .catch(err => {
          res.status(500).json({
            message: "unable to register teacher",
            error: err
          });
        });
    }
  });
};
exports.remove_teacher = (req, res, next) => {
  let id = req.params.teacherId;
  Teacher.findByIdAndRemove(id)
    .then(result => {
      res.status(200).json({
        message: `teacher with id of ${id} successfully removed`,
        result: result
      });
    })
    .catch(err => {
      res.status(404).json({
        message: `no teacher with id of ${id}`,
        error: err
      });
    });
};
exports.authenticate_teacher = (req, res, next) => {
  Teacher.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Authorization Failed"
        });
      } else {
        console.log(user[0].password);
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Authorization Failed"
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
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
              expiresIn: "12h"
            });
            //let decoded  = jwt_decoded(token);
            return res.status(200).json({
              message: "Authorized",
              token: token,
              role: payload.role,
              email: payload.email
            });
          }

          res.status(401).json({
            message: "Authorization Failed"
          });
          console.log(`${req.body.email} + ${req.body.password}`);
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.post_blog = (req, res, next) => {
  blogController.create_a_blog(req, res, next);
};
exports.create_report = (req, res, next) => {
  reportController.create_a_report(req, res, next);
};

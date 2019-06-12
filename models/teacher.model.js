const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        phoneNo: {
            type: String,
            required: true
        },
        email: {
            type: String,

        },
        studyAt: {
            type: String,
            required: true
        },
        field: {
            type: String,
            required: true
        },
        interest: {
            type: String,
            required: true
        }
},{
    collection: 'teacher'
});
module.exports = mongoose.model('Teacher', teacherSchema);

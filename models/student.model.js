const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    school: {
        type: String,
        required: true
    },
    username: {
        type: String,
        default:'STU-0000'
    },
    password: {
        type: String,
        required: true
    },
    supervisor: {
        type: String,
        ref: 'SuperVisor',
        required: true
    },
    role: {
        type: String,
        default: 'student'
    }
},
    {
        collection:'student'
    });
module.exports = mongoose.model('Student', studentSchema);

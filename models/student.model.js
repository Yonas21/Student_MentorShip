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
    id: {
        type: String,
        default:'STU-0000'
    },
    password: {
        type: String,
        default: '0000'
    },
    supervisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SuperVisor',
        required: false
    }
},
    {
        collection:'student'
    });
module.exports = mongoose.model('Student', studentSchema);

const mongoose = require('mongoose');

const evaluatorSchema = mongoose.Schema({
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
    address: {
        type: String,
        required: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    }
},{
    collection: 'evaluator'
});
module.exports = mongoose.model('Evaluator',evaluatorSchema);

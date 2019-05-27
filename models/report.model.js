const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
    numberOfStudents: {
        type: Number,
        required: true
    },
    dateOfReport: {
        type: Date,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    video: {
        type: String,
    },
    text: {
        type: String,
        required: true
    }
},{
    collection: 'report'
});
module.exports = mongoose.model('Report', reportSchema);

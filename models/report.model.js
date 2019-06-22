const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
    numberOfStudents: {
        type: Number,
        required: true
    },
    dateOfReport: {
        type: String,
        required: true
    },
    image: {
        type: Array,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
},{
    collection: 'report'
});
module.exports = mongoose.model('Report', reportSchema);

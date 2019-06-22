const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
    userActivities: {
        type: Array,
        required: true
    },
    evaluator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Evaluator',
        required: false
    },
    report: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Report',
        required: false
    },
    supervisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supervisor',
        required: false
    }
},{
    collection: 'log'
});
module.exports = mongoose.model('Log', logSchema);

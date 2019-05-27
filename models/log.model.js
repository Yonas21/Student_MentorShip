const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
    userActivities: {
        type: Array,
        required: true
    },
    evaluator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Evaluator',
        required: true
    },
    report: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Report',
        required: true
    },
    supervisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supervisor',
        required: true
    }
},{
    collection: 'log'
});
module.exports = mongoose.model('Log', logSchema);

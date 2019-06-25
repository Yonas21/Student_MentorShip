const mongoose = require('mongoose');
const commentSchema = mongoose.Schema({
    commented_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: false
    }
},
    {
        collection: 'comment'
    }
);

module.exports = mongoose.model('Comment', commentSchema);

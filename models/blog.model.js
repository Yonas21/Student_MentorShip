const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    blog: {
        type: String,
        required: true
    }
},{
    collection: 'blog'
});
module.exports = mongoose.model('Blog', blogSchema);

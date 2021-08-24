const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: String,
    imageURL: String,
    description: String,
    vip: Boolean,
    date: { type: Date, default: Date.now },
    likes: Number

})

module.exports = mongoose.model('Post', PostSchema)
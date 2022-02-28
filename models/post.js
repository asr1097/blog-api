const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {type: String, maxlength: 99, required: true},
    text: {type: String, maxlength: 999, required: true},
    timestamp: {type: Date, required: true},
    published: {type: Boolean, required: true},
    comments: {type: Array}
});

module.exports = mongoose.model("post", postSchema);
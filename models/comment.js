const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    title: {type: String, maxlength: 20, default: "Comment title"},
    text: {type: String, maxlength: 99, required: true},
    user: {type: String, maxlength: 20, default: "guest"},
    timestamp: {type: Date, required: true}
});

module.exports = mongoose.model("comment", commentSchema);
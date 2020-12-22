const mongoose = require("mongoose");
// const { schema } = require('./user');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  body: { type: String, default: "", maxlength: 1000 },
  createdAt: { type: Date, default: Date.now() },
  task: { type: Schema.ObjectId, ref: "Task" },
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String },
    user: { type: Schema.ObjectId, ref: 'User' },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now() },
    editedAt: { type: Date, default: null },
    completedAt: { type: Date, default: null }
});

mongoose.model('todo', TaskSchema);
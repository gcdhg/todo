const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String },
    user: { type: Schema.ObjectId, ref: 'User' },
    state: { type: String, default: 'on-hold' },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now() },
    editedAt: { type: Date, default: null },
    completedAt: { type: Date, default: null },
    project: { type: Schema.ObjectId, ref: 'Projects' },
    comments: [{
        comment: {
            type: Schema.ObjectId,
            ref: 'Comments'
        }
    }],
});

const Task = mongoose.model('todo', TaskSchema)

module.exports = Task
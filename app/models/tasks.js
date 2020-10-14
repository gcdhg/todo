const mongoose = require('mongoose');

const Project = require('./projects');
const User = require('./user')

const Schema = mongoose.Schema;


const TaskSchema = new Schema({
    user: { type: Schema.ObjectId, ref: 'User' },
    project: { type: Schema.ObjectId, ref: 'Projects' },
    title: { type: String },
    state: {
        currentState: { type: String, default: 'on-hold' },
        user: { type: Schema.ObjectId, ref: 'User' }
    },
    createdAt: { type: Date, default: Date.now() },
    planedAt: { type: Date },
    editedAt: { type: Date, default: null },
    completedAt: { type: Date, default: null },
    comments: [{ comment: { type: Schema.ObjectId, ref: 'Comment' } }],
});

TaskSchema.path('title').required(true, "Title connot be blank");

TaskSchema.pre('save', async function (next) {
    const task = this;

    if (task.isNew && task.user) {
        await User.findByIdAndUpdate(task.user, {
            $push: {
                tasks: task._id
            }
        });

        next()
    }
    else if (task.isNew && task.project) {
        await Project.findByIdAndUpdate(task.project, {
            $push: {
                tasks: task._id
            }
        });

        next()
    }
    else {
        throw 'wrong data'
    }
});

TaskSchema.pre('deleteOne', async function (next) {
    const task = this;

    if (task._conditions.user) {

        const user = await User.findById(task._conditions.user);
        await user.tasks.splice(user.tasks.indexOf(task._conditions._id), 1);
        await user.save();

        next();
    }
    if (task._conditions.project) {

        const project = await Project.findById(task._conditions.project)
        await project.tasks.splice(project.tasks.indexOf(task._conditions._id), 1)
        await project.save();

        next();

    }

})

const Task = mongoose.model('Task', TaskSchema)

module.exports = Task
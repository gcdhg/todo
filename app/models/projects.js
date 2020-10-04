const mongoose = require('mongoose');
// const { schema } = require('./user');

const User = require('./user');
const Task = require('./tasks')

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    title: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    owner: { type: Schema.ObjectId, ref: 'User', required: true },
    tasks: [{ type: Schema.ObjectId, ref: 'Task' }],
    participants: [{
        user: { type: Schema.ObjectId, ref: 'User' },
        role: { type: String, default: 'worker' }
    }],
});


ProjectSchema.pre('save', async function (next) {
    const project = this;

    await User.findOneAndUpdate({ _id: project.owner }, {
        $push: {
            projects: project._id,
            role: 'owner'
        }
    });

    next();
})


ProjectSchema.pre('remove', async function (next) {
    const project = this;

    await Task.deleteMany({ project: project._id });

    const user = await User.findById(project.owner);

    const newProjectsArr = await user.projects.splice(user.projects.indexOf(project._id), 1);

    await User.findByIdAndUpdate(user._id, {
        tasks: newProjectsArr
    });

    next();
});

/**
 * Statics
 */
ProjectSchema.statics.createNewProject = async function (title, user) {
    const project = new Project({
        title: title,
        owner: user,
        participants: [{
            user: user,
            role: 'owner'
        }],
        tasks: []
    });
    await project.save();

    return true;
};

ProjectSchema.statics.addUserToProject = async function (projectId, userId, userRole = 'worker') {
    await Project.findOneAndUpdate({ _id: projectId }, {
        $push: {
            participants: {
                users: userId,
                role: userRole
            }
        }
    });

    await User.findByIdAndUpdate(userId, {
        $push: {
            projects: projectId
        }
    })

    return true;
};

ProjectSchema.statics.deleteUserFromProject = async function (projectId, userId) {
    const project = await Project.findOne({ _id: projectId });

    const userIndex = await project.participants.findIndex((obj) => obj.users === userId);
    await project.participants.splice(project.participants.indexOf(userIndex), 1);
    await project.update();

    return true;
};

ProjectSchema.statics.changeRoleOfTheUser = async function (projectId, userId, userRole = 'worker') {
    const project = await Project.findOne({ _id: projectId });
    const userIndex = await project.participants.findIndex((obj) => obj.users === userId);
    project.participants[userIndex].role = userRole;

    await project.update();
};

ProjectSchema.statics.deleteProject = async function (projectId) {
    await Project.remove({ _id: projectId }, (err) => {
        if (err) {
            throw 'DB error: ' + err;
        }
    });

    return true;
};

const Project = mongoose.model('Project', ProjectSchema)

module.exports = Project

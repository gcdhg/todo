const mongoose = require('mongoose');
// const { schema } = require('./user');

var Task = mongoose.model('todo');
var User = mongoose.model('User');

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    title: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    owner: { type: Schema.ObjectId, ref: 'User', required: true },
    participants: [{
        user: { type: Schema.ObjectId, ref: 'User' },
        role: { type: String, default: 'worker' }
    }],
    tasks: [{ task: { type: Schema.ObjectId, ref: 'todo' } }]
});

/**
 * Pre-save hook
 */
ProjectSchema.pre('deleteOne', async function (next) {
    const project = this;

    await Task.deleteMany({ project: project._id }, (err) => {
        if (err) {
            throw 'DB error: ' + err;
        }
    });

    next();
});

// ProjectSchema.pre('save', async function (next) {
//     const project = this;

//     await User.findOneAndUpdate({
//         _id: project.owner
//     }, {
//         $push: {
//             inProject: project._id
//         }
//     }, (err) => {
//         if (err) {
//             throw 'DB error: no user found' + err;
//         }
//     });
// });


/**
 * Statics
 */
ProjectSchema.statics.createNewProject = async function (title, user) {
    const project = new Project({
        title: title,
        owner: user,
        participants: [],
        tasks: []
    });
    await project.save();

    const ownerOfProject = await User.findById(user, (err) => {
        if (err) {
            return false;
        }
    });

    await ownerOfProject.inProject.push({ project: project._id });

    await ownerOfProject.save();

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
    }, (err) => {
        if (err) {
            throw 'DB error: ' + err;
        }
    })
    await project.update();

    return true;
};

ProjectSchema.statics.deleteUserFromProject = async function (projectId, userId) {
    const project = await Project.findOne({ _id: projectId }, (err) => {
        if (err) {
            throw 'DB error: ' + err;
        }
    });

    const userIndex = await project.participants.findIndex((obj) => obj.users === userId);
    await project.participants.splice(project.participants.indexOf(userIndex), 1);
    await project.update();

    return true;
};

ProjectSchema.statics.changeRoleOfTheUser = async function (projectId, userId, userRole = 'worker') {
    const project = await Project.findOne({ _id: projectId }, (err) => {
        if (err) {
            throw 'DB error: ' + err;
        }
    });
    const userIndex = await project.participants.findIndex((obj) => obj.users === userId);
    project.participants[userIndex].role = userRole;

    await project.update();
};

ProjectSchema.statics.deleteProject = async function (projectId) {
    // await Task.deleteMany({ project: projectId }, (err) => {
    //     if (err) {
    //         throw 'DB error: ' + err;
    //     }
    // })
    // await Project.findOneAndDelete({ _id: projectId }, (err) => {
    //     if (err) {
    //         throw 'DB error: ' + err;
    //     }
    // });
    await Project.deleteOne({ _id: projectId }, (err) => {
        if (err) {
            throw 'DB error: ' + err;
        }
    });

    return true;
};

const Project = mongoose.model('Projects', ProjectSchema)

module.exports = Project

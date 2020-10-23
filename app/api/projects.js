const mongoose = require('mongoose');
const { wrap: async } = require('co');
const { NotExtended } = require('http-errors');
const { model, findById } = require('../models/user');
const Task = require('../models/tasks');

const Project = mongoose.model('Project');
const User = mongoose.model('User');


module.exports.getUserAssociatedProject = async function (req, res) {
    try {
        const user = await User.findById(req.user)
            .populate([{
                path: 'projects',
                model: 'Project',
                populate: [{
                    path: 'tasks',
                    model: 'Task'
                }, {
                    path: 'participants.user',
                    model: 'User',
                    select: 'username'
                }]
            }])
            .exec();

        if (user) {
            res.status(200).json(user.projects);
        } else {
            res.status(400).json('no user found')
        }
    } catch (err) {
        console.log(err);
        res.status(400).json('project not found');
    }
};

module.exports.getOneProject = async function (req, res) {
    try {
        const project = await Project.findOne({
            title: req.params.project.replace(/-/g, ' '),
            'participants.user': req.user
        })
            .populate([{
                path: 'tasks',
                model: 'Task',
            }, {
                path: 'participants.user',
                model: 'User',
                select: 'username',
            }, {
                path: 'owner',
                model: 'User',
                select: 'username',
            }])
            .exec()

        res.status(200).json(project);

    } catch (err) {
        console.log(err);
        res.status(400).json('error');
    }
};

module.exports.editOneProject = async function (req, res) {
    try {
        const project = await Project.findByIdAndUpdate(req.body.projectId, {
            title: req.body.title
        });

        res.status(201).json('success');
    } catch (err) {
        console.log(err);
        res.status(400).json('error');
    }
};

module.exports.createProject = async function (req, res) {
    // req.user && req.token
    try {
        const project = await Project.createNewProject(req.body.title, req.user)
        if (project) {
            res.status(201).json('project created')
        }
        else {
            res.status(400).json('project creation failed')
        }
    } catch (err) {
        console.log(err);
        res.status(400).json('project creation failed');
    }
};

module.exports.deleteProject = async function (req, res) {
    try {
        if (req.role === 'owner') {
            const result = await Project.deleteProject(req.body.projectId);
            if (result) {
                res.status(201).json('project deleted');
            }
            else {
                console.log(err);
                res.status(400).json('project deletion failed');
            }
        } else {
            res.status(401).json('Not authorized to accsess');
        }

    } catch (err) {
        console.log(err);
        res.status(400).json('project deletion failed');
    }
};

module.exports.addUserToProject = async function (req, res) {
    try {
        if (req.role === 'owner') {
            const result = await Project.addUserToProject(req.body.projectId, req.body.newUser);
            if (result) {
                res.status(201).json('user added to project');
            }
            else {
                res.status(400).json('user adding failed');
            }
        } else {
            res.status(400).json('user adding failed');
        }

    } catch (err) {
        console.log(err);
        res.status(400).json('user adding failed');
    }
};

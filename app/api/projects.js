const mongoose = require('mongoose');
const { wrap: async } = require('co');
const { NotExtended } = require('http-errors');

const Project = mongoose.model('Projects');

module.exports.getProject = async function (req, res) {
    try {
        if (req.role === 'owner' || req.role === 'worker') {
            await Project.findById(req.params.id, (err) => {
                if (err) {
                    console.log(err);
                    res.status(400).json('DB error')
                }
            })
                .populate('tasks.task')
                .exec(function (err, data) {
                    if (err) {
                        console.log(err);
                        res.status(400).json('DB error');
                    }
                    else {
                        res.status(200).json(data)
                    }
                });
        }
    } catch (err) {
        console.log(err);
        res.status(400).json('project not found');
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
        const user = await User.findOne({ _id: req.user }, (err) => {
            if (err) {
                console.log(err);
                res.status(400).json('project deletion failed');
            }
        })
        const result = await Project.deleteProject(user.project);
        if (result) {
            res.status(201).json('project deleted');
        }
        else {
            console.log(err);
            res.status(400).json('project deletion failed');
        }
    } catch (err) {
        console.log(err);
        res.status(400).json('project deletion failed');
    }
};

module.exports.addUserToProject = async function (req, res) {
    try {
        // req.body.id
        const result = await Project.addUserToProject(req.body.projectId, req.body.newUser);
        if (result) {
            res.status(201).json('user added to project');
        }
        else {
            res.status(400).json('user adding failed');
        }
    } catch (err) {
        console.log(err);
        res.status(400).json('user adding failed');
    }
};


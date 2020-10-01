const mongoose = require('mongoose');
const { wrap: async } = require('co');
const { NotExtended } = require('http-errors');

const Task = mongoose.model('todo');
const User = mongoose.model('User');
const Project = mongoose.model('Projects')

/**
 * Get all private Tasks created by user and all Projects which he created or part of
 */
module.exports.showAllData = async function (req, res) {
    try {
        if (req.user && req.token) {
            const user = await userHaveProjects(req.user);
            if (user) {
                const projects = await getAllProject(user._id);

                const task = await Task.find({
                    user: user._id,
                    project: undefined
                }, (err) => {
                    if (err) {
                        console.log(err);
                        res.status(400).json('DB error');
                    }
                });
                if (task) {
                    const result = await Object.assign({}, projects, { task: task })
                    res.status(200).json(result);
                } else {
                    res.status(200).json({
                        title: 'no todos created yet'
                    })
                }
            }
            else {
                const task = await Task.find({
                    user: req.user,
                }, (err) => {
                    if (err) {
                        console.log(err);
                        res.status(400);
                    }
                });
                if (task) {
                    res.status(200).json(task);
                } else {
                    res.status(200).json({
                        title: 'no todos created yet'
                    })
                }
            }
        }
        else {
            console.log(req.user)
            console.log(req.token)
            res.status(400).json('token transaction failed')
        }
    } catch (err) {
        console.log(err)
        res.status(400)
    }
};

/**
 * Get all tasks created by user (including once in owned project)
 */

module.exports.showAllTasks = async function (req, res) {
    try {
        const tasks = await Task.find({ user: req.user, project: undefined }, (err) => {
            if (err) {
                console.log(err);
                res.status(400).json('DB error');
            }
        });
        res.status(200).json(tasks);

    } catch (err) {
        console.log(err)
        res.status(400)
    }
};

/**
 * Create task if user owns project or it's his private task
**/
module.exports.createTask = async function (req, res) {
    try {
        console.log(req.role);
        if (req.role === 'owner') {
            const projectId = String(req.body.projectId);
            const userId = String(req.user);

            console.log(projectId);
            console.log(userId);

            const task = new Task({
                title: req.body.title,
                body: req.body.body,
                user: userId,
                project: projectId
            });

            console.log(task);

            await task.save();

            const project = await Project.findOne({ _id: projectId }, (err) => {
                if (err) {
                    console.log(err);
                    res.status(400).json('DB error');
                }
            });

            const projectTasks = project.tasks;
            projectTasks.push({ task: task._id });

            console.log(projectTasks);

            await Project.updateOne({ _id: project._id }, {
                tasks: projectTasks
            }, (err) => {
                if (err) {
                    console.log(err);
                    res.status(400).json('DB error');
                }
            });

            console.log(project);

            res.status(200).json({ task, project });
        }
        else {
            if (req.role === 'worker') {
                res.status(401).json('Not Authorized to access');
            } else {
                if (req.role === 'user') {
                    const task = new Task({
                        title: req.body.title,
                        body: req.body.body,
                        user: req.user
                    });

                    await task.save();
                    res.status(201).json(task)
                }
                else {
                    res.status(401).json('Not Authorized to access');
                }
            }
        }
    } catch (err) {
        console.log(err)
        res.status(400)
    }
};

/**
 * Get Task by id and if it's private task user can edit it 
 * and if it's project task he can comment it
 */

module.exports.getTaskById = async function (req, res) {
    try {
        await Task.find({
            _id: req.params.id,
            user: req.user
        }, (err, foundData) => {
            if (err) {
                console.log(err);
                res.status(400).json('DB error');
            }
            else {
                res.status(200).json(foundData);
            }
        });

    } catch (err) {
        console.log(err)
        res.status(400);
    }
};

module.exports.editTask = async function (req, res) {
    try {
        if (req.role === 'owner' || req.role === 'user') {
            const task = await Task.findOneAndUpdate({ _id: req.body._id }, {
                title: req.body.title,
                body: req.body.body,
                editedAt: Date.now(),
            }, (err) => {
                if (err) {
                    console.log(err);
                    res.status(406).json('DB error');
                }
            });
            if (!task) console.log(task)

            await task.save();

            res.status(200).json(task);
        }
        else {
            res.status(400).json('Not Authorized to access');
        }

    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
};

module.exports.completeTask = async function (req, res) {
    try {
        var task = await Task.findById(req.body.id, (err, foundData) => {
            if (err) {
                res.status(400).json(
                    err
                )
            }
        });

        if (task.completed) {
            if (req.role === 'owner' || req.role === 'user') {
                task.completed = false;
                task.completedAt = null;
            }
            else {
                res.status(400).json('Task completed already');
            }
        } else {
            task.completed = true;
            task.completedAt = Date.now();
        }

        await task.save();

        res.status(200).json(task);
    } catch (err) {
        console.log(err)
        res.status(400)
    }
};

module.exports.deleteTask = async function (req, res) {
    try {
        if (req.role === 'owner' || req.role === 'user') {
            var id = req.body.id;
            await Task.findByIdAndDelete({
                _id: id,
            }, (err, data) => {
                if (err) {
                    console.log(err);
                    res.status(400).json('DB error');
                }
                res.status(200).json(data);
            });
        }
        else {
            res.status(400).json('Not Authorized to access');
        }
    } catch (err) {
        console.log(err)
        res.status(400)
    }
};

// /** 
//  * functions helpers
// **/
async function userHaveProjects(id) {
    const user = await User.findById(id, (err) => {
        if (err) {
            console.log(err);
            res.status(400);
        }
    });
    if (user) {
        if (user.inProject !== []) {
            return user;
        }
        else {
            return false;
        }
    }
    else {
        return false
    }
};

async function getAllProject(id) {
    try {
        const owenedProjects = await Project.find({ owner: id, })
            .populate('tasks.task')
            .exec()
        const partOfProject = await Project.find({ 'participants.user': id })
            .populate('tasks.task')
            .exec()
        return Object.assign({}, { owenedProjects: owenedProjects }, { partOfProject: partOfProject });
    } catch (err) {
        console.log(err);
        return [];
    }
};

async function isUserOwner(ProjectId, userId) {
    const user = await Project.find({
        _id: ProjectId
    }, (err) => {
        if (err) {
            return [];
        }
    });
    console.log(user);
    if (user) {
        if (user.owner === userId) {
            return true;
        } else {
            return true;
        }
    }
    else {
        return false;
    }
};

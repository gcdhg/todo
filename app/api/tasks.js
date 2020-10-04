const mongoose = require('mongoose');
const { wrap: async } = require('co');
const { NotExtended } = require('http-errors');

const Task = mongoose.model('Task');
const User = mongoose.model('User');
const Project = mongoose.model('Project')

/**
 * Get all tasks created by user (including once in owned project)
 */

module.exports.showAllPrivateTasks = async function (req, res) {
    try {
        const user = await User.findById(req.user)
            .populate('tasks')
            .exec()

        if (user) {
            res.status(200).json(user.tasks);
        }
        else {
            res.status(400).json('No user found');
        }

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
        const projectOrUser = (req.body.projectId) ? { project: req.body.projectId } : { user: req.user };
        const protTask = {
            title: req.body.title,
            planedAt: req.body.planedAt,
        };
        const newTask = Object.assign({}, protTask, projectOrUser);

        if (req.role === 'owner' || req.role === 'owner') {

            const task = new Task(newTask);

            await task.save();

            res.status(200).json(task);
        }
        else {
            res.status(401).json('Not Authorized to access');
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
        const projectOrUser = (req.body.projectId) ? { project: req.body.projectId } : { user: req.user };
        if (req.role === 'owner' || req.role === 'user') {
            const task = await Task.findOne({
                _id: req.params.id,
                project: projectOrUser.project,
                user: projectOrUser.user
            });
    
            if (task) {
                res.status(200).json(task);
            }
            else {
                res.status(400).json('task not found');
            }
        }
        else {
            res.status(401).json('Not Authorized to access');
        }

    } catch (err) {
        console.log(err)
        res.status(400);
    }
};

module.exports.editTask = async function (req, res) {
    try {
        const projectOrUser = (req.body.projectId) ? { project: req.body.projectId } : { user: req.user };

        if (req.role === 'owner' || req.role === 'user') {

            const task = await Task.findOneAndUpdate({
                _id: req.body.id,
                project: projectOrUser.project,
                user: projectOrUser.user
            }, {
                title: req.body.title,
                editedAt: Date.now()
            });

            res.status(200).json(task)
        }
        else {
            res.status(400).json('Not Authorized to access');
        }

    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
};

module.exports.deleteTask = async function (req, res) {
    try {
        const projectOrUser = (req.body.projectId) ? { project: req.body.projectId } : { user: req.user };

        if (req.role === 'owner' || req.role === 'user') {

            var id = req.body.id;

            await Task.remove({
                _id: id,
                project: projectOrUser.projectId,
                user: projectOrUser.user
            });

            res.status(201)
        }
        else {
            res.status(400).json('Not Authorized to access');
        }
    } catch (err) {
        console.log(err)
        res.status(400)
    }
};

module.exports.changeState = async function (req, res) {
    try {
        const possibleStates = ['on-hold', 'active', 'pending', 'on-review', 'completed'];
        if (!possibleStates.includes(req.body.state)) {
            res.status(400).json('no such state');
        }
        else {
            if (req.body.projectId) {
                const indexOfNewState = possibleStates.indexOf(req.body.state);

                const task = await Task.findById(req.body.id);

                const user = (indexOfNewState === 0) ? undefined : req.user;

                if (req.role === 'owner' || (req.role === 'user' && req.user === task.user)) {

                    task.state = {
                        currentState: req.body.state,
                        user: user
                    }

                    await task.update();

                    res.status(200).json(task);
                }
                else {
                    if (indexOfNewState > 2) {
                        res.status(400).json('Not Authorized to access')
                    }
                    else {
                        if (task.state.user.isUndefined()) {
                            task.state = {
                                currentState: req.body.state,
                                user: user
                            }

                            await task.update();

                            res.status(200).json(task);
                        }
                        else {
                            if (task.state.user === req.user) {
                                task.state = {
                                    currentState: req.body.state,
                                    user: user
                                }

                                await task.update();

                                res.status(200).json(task);
                            }
                            else {
                                res.status(400).json('Not Authorized to access')
                            }
                        }
                    }
                }

            }
            else {
                const task = await Task.findOneAndUpdate({
                    _id: req.body.id,
                    user: req.user
                }, {
                    state: req.body.state
                })

                res.status(200).json(task);
            }
        }
    } catch (err) {
        console.log(err);
        res.status(400)
    }
};

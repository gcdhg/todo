const mongoose = require('mongoose');
const { wrap: async } = require('co');
const { NotExtended } = require('http-errors');

const Task = mongoose.model('todo');

module.exports.showAllTasks = async function (req, res) {
    try {
        if (req.user && req.token) {
            await Task.find({
                user: req.user
            }, (err, foundData) => {
                if (err) {
                    res.status(500).json(
                        err
                    );
                }
                if (foundData) {
                    return res.status(200).json(foundData);
                } else {
                    return res.status(200).json({
                        title: 'no todos created yet'
                    })
                }
            });
        }
        else {
            console.log(req.user)
            console.log(req.token)
            res.status(400).json('token transaction failed')
        }
    } catch (err) {
        res.status(400).json(err)
    }

};

module.exports.createTask = async function (req, res) {
    try {
        const task = new Task({
            title: req.body.title,
            body: req.body.body,
            user: req.user
        });

        await task.save();
        res.status(201).json(task)
    } catch (err) {
        res.status(400).json(err)
    }
};

module.exports.getTaskById = async function (req, res) {
    try {
        if (req.user && req.token) {

            await Task.find({
                _id: req.params.id,
                user: req.user
            }, (err, foundData) => {
                if (err) {
                    return res.status(400).json(
                        err
                    );
                }
                else {
                    res.status(200).json(foundData);
                }
            });
        }
        else res.status(400).json('token transaction failed')
    } catch (err) {
        res.status(400).json(err);
    }
};

module.exports.editTask = async function (req, res) {
    try {
        console.log(req.body)
        const task = await Task.findOneAndUpdate({_id: req.body._id}, {
            title: req.body.title,
            body: req.body.body,
            editedAt: Date.now(),
        }, (err, data) => {
            if (err) {
                return res.status(406).json(
                    err
                );
            }
            console.log(data)
        });
        if (!task) console.log(task)

        await task.save();

        res.status(200).json(task);
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
};

module.exports.completeTask = async function (req, res) {
    try {
        if (req.user && req.token) {
            var task = await Task.findById(req.body.id, (err, foundData) => {
                if (err) {
                    return res.status(400).json(
                        err
                    )
                }
            });

            if (task.completed) {
                task.completed = false;
                task.completedAt = null;
            } else {
                task.completed = true;
                task.completedAt = Date.now();
            }

            await task.save();

            res.status(200).json({
                task
            });
        }
        else res.status(400).json('token transaction failed')
    } catch (err) {
        res.status(400).json(err)
    }
};

module.exports.deleteTask = async function (req, res) {
    try {
        if (req.user && req.token) {
            var id = req.body.id;
            await Task.findByIdAndDelete({
                _id: id,
            }, (err, data) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json(err);
                }
                return res.status(200).json(data);
            });
        }
        else res.status(400).json('token transaction failed')
    } catch (err) {
        res.status(400).json(err)
    }
};

const mongoose = require('mongoose');
const { wrap: async } = require('co');
const { NotExtended } = require('http-errors');

const Task = mongoose.model('todo');

module.exports.showAllTasks = async(function* (req, res) {
    const tasks = yield Task.find({}, (err, foundData) => {
        if (err) {
            res.status(500).json(
                err
            );
        }
        if (foundData) {
            return res.status(200).json({
                title: 'ToDo list',
                foundData
            });
        }
        return res.status(200).json({
            title: 'ToDo list',
            foundData
        })
    });
});

module.exports.getTaskById = async(function* (req, res) {
    var tasks = yield Task.findById(req.params.id, (err, foundData) => {
        if (err) {
            return res.status(400).json(
                err
            );
        }
    });

    res.status(302).json({
        title: "Task",
        tasks,
        showOne: true
    });
});

module.exports.createTask = async(function* (req, res) {
    try {
        const task = new Task({
            title: req.body.title.trim(),
            des: req.body.des.trim()
        });

        yield task.save();
        res.status(201).json({
            task
        })
    } catch (err) {
        res.status(510).json(
            err
        );
    }
});

module.exports.editTask = async(function* (req, res) {

    var task = yield Task.findById(req.body.id, (err, foundData) => {
        if (err) {
            return res.status(406).json(
                err
            );
        }
    });

    task.title = req.body.title;
    task.des = req.body.des;
    task.timeOfEdition = Date.now();

    yield task.save();

    res.status().json({
        task
    });
});

module.exports.completeTask = async(function* (req, res) {
    var task = yield Task.findById(req.body.id, (err, foundData) => {
        if (err) {
            return res.status(400).json(
                err
            )
        }
    });

    if (task.completed) {
        task.completed = false;
        task.timeOfComplition = null;
    } else {
        task.completed = true;
        task.timeOfComplition = Date.now();
    }

    yield task.save();

    res.status(200).json({
        task
    });
});

module.exports.getForm = function (req, res) {
    try {
        res.status(200).json({
            title: 'Create todo',
            isCreate: true
        });
    } catch (err) {
        if (err) {
            res.status(500).json(
                err
            );
        }
    }
};

module.exports.getUpdateTask = async(function* (req, res) {

    const task = yield Task.findById({ _id: req.params.id }, (err, updatedData) => {
        if (err) {
            return res.status(500).json(
                err
            );
        }
    });

    res.status(200).json({
        title: 'Edit ToDo',
        isCreate: false,
        task
    });
});

module.exports.deleteTask = async(function* (req, res) {
    var id = req.body.id;
    yield Task.findByIdAndDelete({
        _id: id,
    }, async (err, data) => {
        if (err) {
            return res.status(500);
        }
        return res.status(200).json({
            err
        });
    });
});

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
        } else {
            return res.status(200).json({
                title: 'no tasks created yet'
            })
        }
    });
});

module.exports.getTaskById = async(function* (req, res) {
    var task = yield Task.findById(req.params.id, (err, foundData) => {
        if (err) {
            return res.status(400).json(
                err
            );
        }
    });

    res.status(302).json({
        title: "Task",
        task
    });
});

module.exports.createTask = async(function* (req, res) {
    try {
        const task = new Task({
            title: req.body.title,
            body: req.body.body
        });

        yield task.save();
        res.status(201).json({
            task
        })
    } catch (err) {
    res.status(510).json(
        err
    )
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
    task.body = req.body.body;
    task.editedAt = Date.now();

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
        task.completedAt = null;
    } else {
        task.completed = true;
        task.completedAt = Date.now();
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

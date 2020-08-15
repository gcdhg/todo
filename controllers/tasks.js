const mongoose = require('mongoose');
const { wrap: async } = require('co');
const { NotExtended } = require('http-errors');

const Task = mongoose.model('todo');

exports.showAllTasks = async(function* (req, res) {
    try {
        const tasks = yield Task.find({});

        res.render('index', {
            title: 'ToDo list',
            tasks
        });
    } catch (err) {
        return console.log(err);
    }
});

exports.createTask = async(function* (req, res) {
    const task = new Task({
        title: req.body.title,
        des: req.body.des
    });

    yield task.save();
    res.redirect('/');
});

exports.editTask = async(function* (req, res) {

    var task = yield Task.findById(req.body.id);

    task.title = req.body.title;
    task.des = req.body.des;
    task.timeOfEdition = Date.now();

    yield task.save();

    res.redirect('/');
});

exports.completeTask = async(function* (req, res) {
    var task = yield Task.findById(req.body.id);

    if (task.completed) {
        task.completed = false;
        task.timeOfComplition = null;
    } else {
        task.completed = true;
        task.timeOfComplition = Date.now();
    }

    yield task.save();

    res.redirect('/');
});

exports.getForm = function (req, res) {
    try {
        res.render('create', {
            title: 'Create todo',
            isCreate: true
        });
    } catch (err) {
        if (err) {
            res.status(500);
        }
    }
};

exports.getUpdateTask = async(function* (req, res) {

    const task = yield Task.findById({ _id: req.params.id });

    res.render('create', {
        title: 'Edit ToDo',
        isCreate: false,
        task
    });
});

exports.deleteTask = async(function* (req, res) {
    var id = req.body.id;
    yield Task.findByIdAndDelete({
        _id: id,
    }, async (err, data) => {
        if (err) {
            return res.status(500);
        }
        return res.status(200);
    });

    res.redirect('/');
});

exports.getTaskById = async(function* (req, res) {
    var tasks = yield Task.findById(req.params.id);

    res.render('index', {
        title: "Task",
        tasks,
        showOne: true
    });
});
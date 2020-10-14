const e = require('express');
const { json } = require('express');
const mongoose = require('mongoose');
const validator = require('validator');
const { model } = require('../models/projects');
const Project = require('../models/projects');

const User = mongoose.model('User');

const Schema = mongoose.Schema;

module.exports.getUser = async function (req, res) {
    try {
        if (req.params.id) {
            const user = await User.findOne({
                username: req.params.id
            })
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
                }, {
                    path: 'tasks',
                    model: 'Task'
                }])
                .exec();
            if (user) {
                if (req.user === user._id) {
                    res.status(200).json({
                        id: user._id,
                        username: user.username,
                        email: user.email
                    })
                }
                else {
                    res.status(200).json({
                        id: user._id,
                        name: user.name,
                        surname: user.surname,
                        username: user.username,
                        email: user.email,
                        tasks: user.tasks,
                        projects: user.projects
                    });
                }
            } else {
                res.status(400).json('no user found')
            }
        }
        else {
            const user = await User.findOne({
                _id: req.user
            })
            res.status(200).json({
                id: user._id,
                name: user.name,
                surname: user.surname,
                username: user.username,
                email: user.email,
                tasks: user.tasks,
                projects: user.projects
            })
        }
    } catch (err) {
        console.log(err);
        res.status(400).json('operation failed');
    }
};

module.exports.createUser = async function (req, res) {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json();
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
};

module.exports.findUserByUsername = async function (req, res) {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            res.status(400).json('no user found')
        }
        else {
            res.status(200).json({
                id: user._id,
                username: user.username,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(400).json('operation failed');
    }
};

module.exports.loginUser = async function (req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        if (user) {
            try {
                const token = await user.generateAuthToken()

                req.session.userid = user._id;
                req.session.token = token;
                res.status(200).json({
                    username: user.username,
                    token: token
                });
            } catch (err) {
                console.log(err)
                res.status(400).json('Login failed')
            }
        }
        else {
            return res.status(401).json('Login failed');
        }

    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
};

module.exports.logoutUserOnce = async function (req, res) {
    try {
        const token = (req.body.hasOwnProperty('token')) ? req.body.token : req.token
        const id = req.user;

        const isDestroied = await User.destroyToken(id, token)

        if (isDestroied) {
            res.status(201).json()
        } else {
            res.status(400).json()
        }
    } catch (err) {
        console.log(err);
        res.status(400).json('logout failed')
    }

};

module.exports.logoutUserOnAllDevices = async function (req, res) {
    try {
        const token = req.token;
        const id = req.token;

        console.log(token);

        const isDestroied = await User.destroyAllTokens(id, token)

        if (isDestroied) {
            res.status(201).json()
        }
        else {
            res.status(400).json()
        }

    } catch (err) {
        console.log(err);
        res.status(400).json('logout on all devices failed')
    }
};

module.exports.deleteUser = async function (req, res) {
    try {
        const { email, password } = req.body
        const isDeleted = await User.findByCredentialsAndDelete(email, password)

        if (isDeleted) {
            res.status(201).json()
        }
        else {
            res.status(400).json()
        }
    } catch (err) {
        console.log(err);
        res.status(400).json()
    }
};

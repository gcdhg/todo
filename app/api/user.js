const mongoose = require('mongoose');
const { wrap: async } = require('co');
const { response } = require('express');

const User = mongoose.model('User');

module.exports.createUser = async function (req, res) {
    try {
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
};

module.exports.loginUser = async function (req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        if (!user) {
            return res.status(401).send({ error: 'Login failed! Check authentication credentials' });
        }
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
};

module.exports.logoutUserOnce = async function (req, res) {
    const { email, password, token } = req.body;
    await User.destroyToken(email, password, token)
        .then(response => {
            if(response.tokens.length) {
                res.status(400).send(response);
            }
            res.status(201).send('token deleted');
        });
};

module.exports.deleteUser = async function (req, res) {
    const { email, password } = req.body;
    await User.findByCredentialsAndDelete(email, password)
        .then(result => {
            if (result) {
                res.status(201).send('user deleted');
            }
        }).catch(err => {
            res.status(400).send('db error ' + err);
        })
};
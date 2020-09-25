const mongoose = require('mongoose');
const { wrap: async } = require('co');

const User = mongoose.model('User');

module.exports.createUser = async function (req, res) {
    try {
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};

module.exports.loginUser = async function (req, res) {
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
};

module.exports.logoutUser = async function (req, res) {
    try {
        const {email, password} = req.body;
    } catch (error) {
        res.status(400).send(error);
    }
};

module.exports.deleteUser = async function (req, res) {
    try {
        const {email, password} = req.body;
        const user = await User.findByIdAndDelete()
    } catch (error) {
        res.status(400).send(error);
    }
}
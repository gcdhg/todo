const mongoose = require('mongoose');
const { wrap: async } = require('co');

const User = mongoose.model('User');

module.exports.createUser = async(function* (req, res) {
    try {
        const sendData = req.body;

        const newUser = new User({
            name: sendData.name,
            email: sendData.email,
            username: sendData.username,
            salt: User.makeSalt(),
            hashed_password: User.encryptPassword(sendData.password),
        });

        yield newUser.save();
        return res.status(200);
    } catch (err) {
        return res.status(500);
    }
});

module.exports.login = async(function* (req, res) {
    const name = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const foundUser = User.find({
        username: name,
        email: email,
    }, (err, foundData) => {
        return res.status(500).json(
            {'message':'User not found'}
        );
    });

    if (foundUser.auth(encryptPassword(password))) {
        return res.status(200).json();
    }
});
const mongoose = require('mongoose');

const User = mongoose.model('User');

// 
module.exports.createUser = async function (req, res) {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ user });
    } catch (err) {
        if (err.code === 11000) {
            res.status(409).json({
                error: '1100',
                body: "User with this credentials already exist"
            });
        }
        else {
            res.status(400).json(err);
        }
    }
};

// response.writeHead(301,
//     {Location: 'http://whateverhostthiswillbe:8675/'+newRoom}
//   );

// 
module.exports.loginUser = async function (req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        if (!user) {
            return res.status(401).json({
                error: 401,
                body: 'Login failed! Check authentication credentials'
            });
        }
        await user.generateAuthToken()
            .then(token => {
                req.session.userid = user._id;
                req.session.token = token;
                console.log(res.session);
                res.status(200).json({ user, token });
            })
            .catch(err => {
                res.status(500).json({
                    error: 500,
                    body: "Token generation failed"
                })
            });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
};

module.exports.logoutUserOnce = async function (req, res) {
    const { email, password, token } = req.body;
    await User.destroyToken(email, password, token)
        .then(response => {
            if (response.tokens.length) {
                res.status(400).json(response);
            }
            res.status(201).json('token deleted');
        }).catch(err => {
            res.status(400).json(err)
        });
};

module.exports.deleteUser = async function (req, res) {
    const { email, password } = req.body
    await User.findByCredentialsAndDelete(email, password)
        .then(result => {
            if (result) {
                res.status(201).json('user deleted');
            }
        }).catch(err => {
            res.status(400).json('db error ' + err);
        })
};
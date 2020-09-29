const jwt = require('jsonwebtoken');
const User = require('@ToDoModels/user');

const auth = async (req, res, next) => {
    const token = req.headers.authorization.replace('Bearer ', '');
    if (token) {
        try {
            const data = jwt.verify(token, process.env.JWT_KEY);
            const user = await User.findOne({ _id: data._id, 'tokens.token': token }, (err, data) => {
                if (err) {
                    console.log(err);
                }
            });
            if (!user) {
                res.status(400).json({ error: 'No user found' });
            }
            req.user = user._id;
            req.token = token;
            next();
        } catch (err) {
            res.status(401).json({ error: 'Not authorized to access this resource' });
        }
    }
    else {
        res.status(400).json({ error: 'No token found' });
    }
}
module.exports = auth;
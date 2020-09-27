const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, trim: true },
    email: {
        type: String, unique: true,
        // validate: function (value) {
        //     if (validator.isEmail(value)) {
        //         throw new Error({ error: "Invalid Email address" });
        //     }
        // }
    },
    username: { type: String, unique: true, trim: true },
    provider: { type: String, },
    password: { type: String, },
    salt: { type: String, },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.pre('save', async function (next) {

    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8).catch(err => {
            throw "failed to encrypt data"
        })
    }

    next();
})

UserSchema.methods.generateAuthToken = async function () {
    // Generate an auth token for the user
    const user = this;
    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};

UserSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ email })
    if (!user) {
        throw 'Invalid login credentials'
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw 'Invalid login credentials'
    }
    return user
}

UserSchema.statics.findByCredentialsAndDelete = async function (email, password) {
    const user = await User.findByCredentials(email, password);
    await User.findOneAndDelete({
        email: user.email,
        username: user.username
    }, (err, data) => {
        if (err) {
            return false;
        }
    });
    return true;
};

UserSchema.statics.destroyToken = async function (email, password, token) {
    const user = await User.findByCredentials(email, password)
    const newTokens = user.tokens.splice(user.tokens.indexOf(token), 1);
    await User.findOneAndUpdate({
        email: user.email,
    }, {
        tokens: newTokens
    });
    user.save();
    return user;
};

// UserSchema.statics.destroyAllTokens = async function (email, password) {
//     const user = await User.findByCredentials(email, password);
//     user.tokens = [];
//     await user.save();
//     return user;
// };

const User = mongoose.model('User', UserSchema)

module.exports = User
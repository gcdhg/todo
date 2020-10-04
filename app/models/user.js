const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Task = require('./tasks');
const Project = require('./projects');


const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, trim: true },
    surname: { type: String, trim: true },
    email: { type: String, unique: true },
    username: { type: String, unique: true, trim: true },
    password: { type: String, },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    tasks: [{ type: Schema.ObjectId, ref: 'Task' }],
    projects: [{ type: Schema.ObjectId, ref: 'Projects' }],
});

/**
 * Validations
 */

UserSchema.path('email').required(true, "Email cannot be blank");
UserSchema.path('password').required(true, "Password cannot be blank");
UserSchema.path('username').required(true, "Username cannot be blank");

UserSchema.path('email').validate(async function (email) {
    return await validator.isEmail(email) && !validator.isEmpty(email)
}, 'Wrong email');

UserSchema.path('username').validate(async function (username) {
    return await validator.isAlphanumeric(username) && !validator.isEmpty(username)
}, 'Wrong username');

UserSchema.path('name').validate(async function (name) {
    return await validator.isAlphanumeric(name)
}, 'Wrong name');

UserSchema.path('surname').validate(async function (surname) {
    return await validator.isAlphanumeric(surname)
}, 'Wrong surname');

/**
 * Pre-save hook
 */
UserSchema.pre('save', async function (next) {

    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8).catch(err => {
            throw "failed to encrypt data"
        })
    }

    next();
});

UserSchema.pre('remove', async function (next) {
    // const user = await this.model.findOne(this.getQuery());
    const user = this;

    console.log('works');
    await Task.deleteMany({ user: user._id })

    await Project.deleteMany({ owner: user._id })

    next()
});


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

    await User.deleteOne({ email: user.email });
    return true;
};

UserSchema.statics.destroyToken = async function (id, token) {
    const user = await User.findOne({ _id: id, 'tokens.token': token })
    if (!user) {
        throw ('no such token')
    }
    const newTokens = user.tokens;
    await user.tokens.splice(user.tokens.indexOf(token), 1);
    await User.findOneAndUpdate({
        email: user.email,
    }, {
        tokens: newTokens
    });
    return true;
};

UserSchema.statics.destroyAllTokens = async function (id, token) {
    
    await User.findOneAndUpdate({
        _id: id,
        'tokens.token': token
    }, {
        tokens: []
    });
    return true;
};

const User = mongoose.model('User', UserSchema)

module.exports = User
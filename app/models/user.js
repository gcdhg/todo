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
    hashed_password: { type: String, },
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
        user.password = await bcrypt.hash(user.password, 8)
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

UserSchema.statics.findByCredenitials = async (email, password) => {
    const user = await User.find({ email })

    if (!user) {
        throw new Error({ error: 'Invalid login credentials' });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
};

const User = mongoose.model('User', UserSchema)

module.exports = User
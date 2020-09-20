const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    username: { type: String, default: '' },
    provider: { type: String, default: '' },
    hashed_password: { type: String, default: '' },
    salt: { type: String, default: '' },
    authToken: { type: String, default: '' }
});

UserSchema.method = {
    makeSalt: function () {
        return Math.round(new Date().valueOf() * Math.random() + '');
    },
    encryptPassword: function (password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    },
}

mongoose.model('User', UserSchema);
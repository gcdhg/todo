const { Schema, model } = require('mongoose');

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    des: {
        type: String
    },
    completed: {
        type: Boolean,
        default: false
    },
    timeOfCreation: {
        type: Date,
        default: Date.now()
    },
    timeOfEdition: {
        type: Date,
        default: null
    },
    timeOfComplition: {
        type: Date,
        default: null
    }
});

module.exports = model('todo', schema);
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
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

mongoose.model('todo', schema);
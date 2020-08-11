const {Schema, model} = require('mongoose');

const Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    timeOfCreation: {
        type: Date,
        default: Date.now()
    },
    timeOfComplition: {
        type: Date
    }
});

model.export = model('todo', Schema);
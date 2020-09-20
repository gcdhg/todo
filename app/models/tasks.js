const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String },
    user: { type: Schema.ObjectId, ref: 'User' },
    comment: {
        body: { type: String, default: '', maxlength: 1000 },
        // user: { type: Schema.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now() }
    },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now() },
    editedAt: { type: Date, default: null },
    completedAt: { type: Date, default: null }
});

// TaskSchema.method = {
//     load: function (id) {
//         return 
//     }
// }

mongoose.model('todo', TaskSchema);
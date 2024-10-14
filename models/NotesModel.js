const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    noteTitle: {
        type: String,
        required: true,
    },
    noteDescription: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        enum: ['HIGH', 'MEDIUM', 'LOW'],
        required: true,
    },
    dateAdded: {
        type: Date,
        default: Date.now,
    },
    dateUpdated: {
        type: Date,
        default: Date.now,
    },
});

noteSchema.pre('save', function(next) {
    this.dateUpdated = Date.now();
    next();
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;

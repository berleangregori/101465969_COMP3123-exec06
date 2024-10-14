const express = require('express');
const noteModel = require('../models/NotesModel.js'); // Ensure this path is correct
const router = express.Router();

// Create a new note
router.post('/', (req, res) => {
    // Validate request
    if (!req.body.noteTitle || !req.body.noteDescription || !req.body.priority) {
        return res.status(400).send({
            message: "Note content cannot be empty"
        });
    }

    const note = new noteModel({
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority,
        dateAdded: new Date(),
        dateUpdated: new Date(),
    });

    note.save()
        .then(data => {
            res.send(data); // Send the saved note back as response
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the note."
            });
        });
});

// Retrieve all notes
router.get('/', (req, res) => {
    noteModel.find()
        .then(notes => {
            res.send(notes);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
});

// Retrieve a single note by noteId
router.get('/:noteId', (req, res) => {
    const id = req.params.noteId;
    noteModel.findById(id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + id
                });
            }
            res.send(note);
        })
        .catch(err => {
            return res.status(500).send({
                message: "Error retrieving note with id " + id
            });
        });
});

// Update a note by noteId
router.put('/:noteId', (req, res) => {
    const id = req.params.noteId;

    // Validate request
    if (!req.body.noteTitle || !req.body.noteDescription || !req.body.priority) {
        return res.status(400).send({
            message: "Note content cannot be empty"
        });
    }

    noteModel.findByIdAndUpdate(id, {
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority,
        dateUpdated: new Date()
    }, { new: true })
    .then(note => {
        if (!note) {
            return res.status(404).send({
                message: "Note not found with id " + id
            });
        }
        res.send(note);
    })
    .catch(err => {
        return res.status(500).send({
            message: "Error updating note with id " + id
        });
    });
});

// Delete a note by noteId
router.delete('/:noteId', (req, res) => {
    const id = req.params.noteId;

    noteModel.findByIdAndRemove(id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + id
                });
            }
            res.send({ message: "Note deleted successfully!" });
        })
        .catch(err => {
            return res.status(500).send({
                message: "Could not delete note with id " + id
            });
        });
});

module.exports = router;

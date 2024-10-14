const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const DB_URL = process.env.DB_URL; // Ensure you set DB_URL in your .env file
const noteRoutes = require('./routes/NoteRoutes'); // Adjust path if necessary

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Successfully connected to the database MongoDB Atlas Server");
    })
    .catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });

app.get('/', (req, res) => {
    res.send("<h1>Welcome to the Note-taking application - Week06 Exercise</h1>");
});

// Use the note routes
app.use('/notes', noteRoutes); // Add this line to use your NoteRoutes

app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});

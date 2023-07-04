const path = require('path');
const router = require('express').Router();

// The Request Routes for the HTML files

// A GET Request, "/notes", that fetches and returns the notes.html file
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// All other GET requests, as represented by the asterisk, fetch and return the index.html file
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;

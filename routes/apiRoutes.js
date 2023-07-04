const router = require('express').Router();
const store = require('../db/store');

// The Request Routes for the notes data

// A GET request, "/api/notes", that fetches all notes from the database
router.get('/notes', (req, res) => {
  store
    .getNotes()
    .then((notes) => {
      return res.json(notes);
    })
    .catch((err) => res.status(500).json(err));
});

// A POST request, "/api/notes", that receives a new note to save to the database
router.post('/notes', (req, res) => {
  store
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
});

// A DELETE request, "/api/notes/:id", that receives a query parameter, in the form of a specific note's id,
// that indicates which note should be deleted
router.delete('/notes/:id', (req, res) => {
  store
    .removeNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;

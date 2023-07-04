const util = require('util');
const fs = require('fs');

// This Package is used to generate unique ids for each generated note: https://www.npmjs.com/package/uuid
const uuidv1 = require('uuid/v1');

const readFileAsynchronous = util.promisify(fs.readFile);
const writeFileAsynchronous = util.promisify(fs.writeFile);

class Store {
  read() {
    return readFileAsynchronous('db/db.json', 'utf8');
  }

  write(note) {
    return writeFileAsynchronous('db/db.json', JSON.stringify(note));
  }

  getNotes() {
    return this.read().then((notes) => {
      let parsedNotes;

      // Attempts to get the notes, but if notes isn't an array/can't be turned into one, 
      // sends back a new empty array instead
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }

      return parsedNotes;
    });
  }

  addNote(note) {
    const { title, text } = note;

    if (!title || !text) {
      throw new Error("Sorry, but'title' and 'text' can't be blank!");
    }

    // Generates a unique id for a newly created note using uuid package
    const newNote = { title, text, id: uuidv1() };

    // First fetches all notes, adds the new notes to the array, writes all the updated notes, and then finally returns the newNote
    return this.getNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNote);
  }

  removeNote(id) {
    // First fetches all notes, removes the note with the selected id, and then finally writes the filtered, remaining notes
    return this.getNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((filteredNotes) => this.write(filteredNotes));
  }
}

module.exports = new Store();

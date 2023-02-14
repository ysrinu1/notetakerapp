const fs = require("fs");
const util = require("util");
const uuid = require("uuid");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  read() {
    return readFileAsync("db/db.json", "utf-8");
  }

  write(note) {
    return writeFileAsync("db/db.json", JSON.stringify(note));
  }

  async getNotes() {
    let notes = await this.read();
    let parsedNotes;

    try {
      return (parsedNotes = [].concat(JSON.parse(notes)));
    } catch (err) {
      return (parsedNotes = []);
    }
  }

  async setNotes(note) {
    const { title, text } = note;

    if (!title || !text) {
      throw new Error("Note 'title and 'text' cannot be blank");
    }

    const newNote = { title, text, id: uuid.v1() };
    const notes = await this.getNotes();

    const notesArray = [...notes, newNote];
    this.write(notesArray);

    return newNote;
  }

  async deleteNote(id) {
    const notes = await this.getNotes();

    const filteredNotes = notes.filter((note) => {
      note.id !== id;
    });

    this.write(filteredNotes);
  }
}

module.exports = new Store();

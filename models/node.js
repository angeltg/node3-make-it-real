const mongoose = require('mongoose');

//Definimos el Schema
const NoteSchema = mongoose.Schema({
    title: String,
    body: String
});
//Definimos el modelo
const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
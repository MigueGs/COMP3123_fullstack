const mongoose = require('mongoose');

// Definir el esquema para las notas
const NoteSchema = new mongoose.Schema({
    noteTitle: { type: String, required: true },
    noteDescription: { type: String, required: true },
    priority: { type: String, enum: ['HIGH', 'MEDIUM', 'LOW'], required: true },
    dateAdded: { type: Date, default: Date.now },
    dateUpdated: { type: Date, default: Date.now }
});

// Exportar el modelo
module.exports = mongoose.model('Note', NoteSchema);

const noteModel = require('../models/NotesModel.js'); // Asegúrate de que el nombre del archivo es correcto
const express = require('express');
const router = express.Router(); // Cambia de 'app' a 'router'

// Crear una nueva nota
router.post('/', (req, res) => {
    // Validar que el contenido no esté vacío
    if (!req.body.noteTitle || !req.body.noteDescription || !req.body.priority) {
        return res.status(400).send({
            message: "El contenido de la nota no puede estar vacío"
        });
    }

    // Crear una nueva nota
    const note = new noteModel({
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority
    });

    // Guardar la nota en la base de datos
    note.save()
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al guardar la nota."
            });
        });
});

// Obtener todas las notas
router.get('/', (req, res) => {
    noteModel.find()
        .then(notes => res.send(notes))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar las notas."
            });
        });
});

// Obtener una nota por su ID
router.get('/:noteId', (req, res) => {
    noteModel.findById(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Nota no encontrada con el ID " + req.params.noteId
                });
            }
            res.send(note);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al recuperar la nota con el ID " + req.params.noteId
            });
        });
});

// Actualizar una nota
router.put('/:noteId', (req, res) => {
    // Validar la petición
    if (!req.body.noteTitle || !req.body.noteDescription || !req.body.priority) {
        return res.status(400).send({
            message: "El contenido de la nota no puede estar vacío"
        });
    }

    // Buscar la nota por ID y actualizarla
    noteModel.findByIdAndUpdate(req.params.noteId, {
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority,
        dateUpdated: Date.now()
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Nota no encontrada con el ID " + req.params.noteId
                });
            }
            res.send(note);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar la nota con el ID " + req.params.noteId
            });
        });
});

// Eliminar una nota
router.delete('/:noteId', (req, res) => {
    noteModel.findByIdAndDelete(req.params.noteId) // Cambiado de findByIdAndRemove a findByIdAndDelete
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Nota no encontrada con el ID " + req.params.noteId
                });
            }
            res.send({ message: "Nota eliminada exitosamente!" });
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar la nota con el ID " + req.params.noteId
            });
        });
});

module.exports = router; // Exportar el router




var express = require('express');
var router = express.Router();
var categoria = require('../models/Categoria')
var mongoose = require('mongoose');
const Categoria = require('../models/Categoria');
var db = mongoose.connection;

// GET - Listado de categorías ordenadas por fecha de creación
router.get('/', function (req, res, next) {
  Categoria.find().sort('-creationdate').exec(function (err, categorias) {
    if (err) res.status(500).send(err);
    else res.status(200).json(categorias);
  });
});

// GET - Listar una única categoría por su Id
router.get('/:id', function (req, res, next) {
  Categoria.findById(req.params.id, function (err, categoriainfo) {
    if (err) res.status(500).send(err);
    else res.status(200).json(categoriainfo);
  });
});

// GET - Listar una única categorías por su nombre
router.get('/findcategoria', function (req, res, next) {
  Categoria.findOne({ nombre: req.body.nombre_categoria }, function (err, categoria) {
    if (err) res.status(500).send(err);
    else res.status(200).json(categoria);
  });
});

// POST - Crear una nueva categoría
router.post('/', function (req, res, next) {
  Categoria.create(req.body, function (err, categoriainfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

// PUT - Actualizar una categoría existente identificada por su Id
router.put('/:id', function (req, res, next) {
  Categoria.findByIdAndUpdate(req.params.id, req.body, function (err) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

// DELETE - Eliminar una categoría existente identificada por su Id
router.delete('/:id', function (req, res, next) {
  Categoria.findByIdAndDelete(req.params.id, function (err, categoriainfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

module.exports = router;
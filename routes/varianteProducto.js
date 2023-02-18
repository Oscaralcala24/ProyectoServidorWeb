var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var producto = require('./../models/Producto');
const VarianteProducto = require('../models/VarianteProducto');
var db = mongoose.connection;

// GET - Listado de VarianteProducto de un producto
router.get('/', function (req, res, next) {
  let queryProducto = req.query.producto;
  if(queryProducto !== undefined && queryProducto !== null){
    VarianteProducto.find({ producto : queryProducto }).exec(function (error, varianteInfo) { 
      if (error) res.status(500).send(error);
      else res.status(200).json(varianteInfo);
    });
  }else{
    VarianteProducto.find().exec(function (error, varianteInfo) {
      if (error) res.status(500).send(error);
      else res.status(200).json(varianteInfo);
  });
}
});

// GET - Listar una única VarianteProducto por su Id
router.get('/:id', function (req, res, next) {
  VarianteProducto.findById(req.params.id, function (err, infoVarianteProducto) {
    if (err) res.status(500).send(err);
    else res.status(200).json(infoVarianteProducto);
  });
});

// POST - Crear una nueva VarianteProducto
router.post('/', function (req, res, next) {
  VarianteProducto.create(req.body, function (err) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

// PUT - Actualizar una VarianteProducto existente identificada por su Id
router.put('/:id', function (req, res, next) {
  VarianteProducto.findByIdAndUpdate(req.params.id, req.body, function (err) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

// DELETE - Eliminar una VarianteProducto existente identificada por su Id
router.delete('/:id', function (req, res, next) {
  VarianteProducto.findByIdAndDelete(req.params.id, function (err) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

module.exports = router;
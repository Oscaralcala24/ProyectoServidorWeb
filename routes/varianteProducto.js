var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var producto = require('./../models/Producto');
var VarianteProducto = require('../models/VarianteProducto');
var db = mongoose.connection;
const { body, validationResult } = require('express-validator');

router.get('/crearVarianteProducto', function (req, res, next) {
  res.render('crearVarianteProducto');
});

router.post('/', function(req, res, next) {
  VarianteProducto.create(req.body, function (err, varianteProducto) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

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
router.post('/registrarVarianteProducto',
[
  body('sku', 'Introduzca el sku')
    .exists() // Que no esté vacio
    .isNumeric(),
    body('talla', 'Introduzca la talla')
    .exists()
    .isIn(["XS","S","M","L","XL","XXL","3XL"]),
    body('cantidad', 'Introduzca la cantidad')
    .exists()
    .isNumeric(),
    body('producto', 'Introduzca el id del producto')
    .exists()
    /*.custom((value, {req}) => {
    if(req.body.producto != undefined && req.body.producto.id == undefined) {
      throw new Error("Introduzca el nombre del producto");
    } else {
      return true
    }
    })*/
],
 function (req, res) {
  const errorValidacion = validationResult(req);
  if (!errorValidacion.isEmpty()) {
    const validaciones = errorValidacion.array();
    const valores = req.body;
    res.render('crearVarianteProducto', {validaciones:validaciones, valores:valores});
  } else {
    VarianteProducto.create(req.body, function (err) {
      if (err) res.status(500).send(err);
      else res.sendStatus(200);
    });
  }
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
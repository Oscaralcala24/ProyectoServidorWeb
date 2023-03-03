var express = require('express');
var router = express.Router();
var varianteProducto = require('../models/VarianteProducto')
var Producto = require('../models/Producto')
var usuario = require('../models/Usuario');
var mongoose = require('mongoose');
var db = mongoose.connection;

/* Inserta un producto */
router.post('/', function(req, res, next) {
  Producto.create(req.body, function (err, producto) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});
/* Mostrar todos los productos o todos los productos de una categoria*/
router.get('/', function (req, res, next) {
  let queryCategoria = req.query.categoria;
  if(queryCategoria !== undefined && queryCategoria !== null){
    Producto.find({ categoria: queryCategoria }).exec(function (error, categoriaInfo) {
      if (error) res.status(500).send(error);
      else res.status(200).json(categoriaInfo);
    });
  }else{
    Producto.find().exec(function (error, categoriaInfo) {
      if (error) res.status(500).send(error);
      else res.status(200).json(categoriaInfo);
    });
  }
});


/*Mostrar los productos mayor que un precio determinado*/
router.get('/precioMayor',function (req, res) {
let queryPrecio = req.query.precio;
  if(queryPrecio !== undefined && queryPrecio !== null){
    Producto.find().where('precio').gte(queryPrecio).exec(function (error, precioInfo) { //Query donde cuando encuentre precio que nos muestre los productos de un precio mayor al que hemos pasado por la url
      if (error) res.status(500).send(error);
      else res.status(200).json(precioInfo);
    });
  }else{
    Producto.find().exec(function (error, categoriaInfo) {
      if (error) res.status(500).send(error);
      else res.status(200).json(categoriaInfo);
  });
}
});

/*Mostrar los productos menor que un precio determinado*/
router.get('/precioMenor',function (req, res) {
let queryPrecio = req.query.precio;
  if(queryPrecio !== undefined && queryPrecio !== null){
    Producto.find().where('precio').lte(queryPrecio).exec(function (error, precioInfo) { //Query donde cuando encuentre precio que nos muestre los productos de un precio menor al que hemos pasado por la url
      if (error) res.status(500).send(error);
      else res.status(200).json(precioInfo);
    });
  }else{
    Producto.find().exec(function (error, categoriaInfo) {
      if (error) res.status(500).send(error);
      else res.status(200).json(categoriaInfo);
  });
}
});

/* Mostrar un producto con una id */
router.get('/:id', function (req, res, next) {
  Producto.findById(req.params.id,function (err, producto) {
    if (err) res.status(500).send(err);
    else res.status(200).json(producto);
  });
});

/* Borrar un producto */
router.delete('/:id', function (req, res, next) {
  Producto.findByIdAndDelete(req.params.id, function (err, producto) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});


/* Muestra los productos favoritos del usuario */
router.get('/favoritos/:id', function (req, res, next) {
  Producto.find({'usuario': req.params.id },{}).populate('usuario').exec(function (err, producto){
    if (err) res.status(500).send(err);
    else res.status(200).json(producto);
  });
});

/*Muestra todos los productos filtrado por precio*/

module.exports = router;
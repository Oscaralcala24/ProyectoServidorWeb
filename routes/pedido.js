var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const Pedido = require('../models/Pedido');
const Usuario = require('../models/Usuario');
var db = mongoose.connection;
const { body, validationResult } = require('express-validator');



/*GET - Muestra todos los pedidos de un usuario*/
router.get('/usuario/:id', function(req, res, next) {
  Pedido.find({ 'usuario': req.params.id },{"estado":1}).populate('usuario',{'dni':1,"_id":0}).exec(function(err, posts) {
      if (err) res.status(500).send(err);
      else res.status(200).json(posts);
  });
});

// POST - Crear un nuevo pedido y validación lado servidor
router.post('/registrarPedido', [
  body('Estado', 'Ingrese un estado Correcto')
    .isEmpty()
    .isIn(["En camino","En preparacion,","Preparado","Entregado"])
    .exists(),
  body('Fecha', 'Ingrese una fecha Correcta')
    .isDate(),
  body('Cantidad Producto', 'Ingresa una cantidad por favor')
    .exists()
    .isNumeric(),
  body('Producto [id]', 'Ingresa el id de un producto por favor')
    .exists(),
  body('Usuario [id]', 'Ingresa el id de un usuario por favor')
    .exists()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(req.body)
    const valores = req.body;
    const validaciones = errors.array()
    res.render('crearPedido', { validaciones: validaciones, valores: valores })
  } else {
    Pedido.create(req.body, function (error, productoInfo) {
      if (error) res.status(500).send(error);
      else res.sendStatus(200);
    });  }
})

/*POST - Crear nuevo pedido*/
router.post('/', function (req, res, next) {
  Pedido.create(req.body, function (err, pedidoinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

/*GET - Muestra los pedidos ordenados por una fecha determinada [ASC]*/
router.get('/ordenarFechaASC',function (req, res) {
  let fecha = req.query.fecha;
  
  if (fecha !== undefined && fecha !== null){
    Pedido.find().where('fecha').gte(fecha).exec(function (err, estadoPedido) {
      if (err) res.status(500).send(err);
      else res.status(200).json(estadoPedido);
    })
  }else{
    Pedido.find().exec(function (err, estadoPedido) { //Si no lo encuentra nos mostrará un array vacio, y si la query está vacia todos los pedidos.
      if (err) res.status(500).send(err);
      else res.status(200).json(estadoPedido);
    });
  }
});

/*GET - Muestra los pedidos ordenados por una fecha determinada [DESC]*/
router.get('/ordenarFechaDESC',function (req, res) {
  let fecha = req.query.fecha;  //EJ ARC -> http://localhost:5000/pedido/ordenarFechaDESC ?fecha=2023-02-1
  
  if (fecha !== undefined && fecha !== null){
    Pedido.find().where('fecha').lte(fecha).exec(function (err, estadoPedido) {
      if (err) res.status(500).send(err);
      else res.status(200).json(estadoPedido);
    })
  }else{
    Pedido.find().exec(function (err, estadoPedido) { //Si no lo encuentra nos mostrará un array vacio, y si la query está vacia todos los pedidos.
      if (err) res.status(500).send(err);
      else res.status(200).json(estadoPedido);
    });
  }
});

/*GET - Muestra los estados de los pedidos, pasando por url el estado que quiere visualizar*/
router.get('/',function (req,res,next) {
  let queryPedido = req.query.estado; //Creamos la query, con el estado que hemos pasado por parametro | EJ ARC -> http://localhost:5000/pedido/ordenarFechaASC?fecha=2023-02-16
  if(queryPedido !== undefined){ //Si la query no está vacia nos entrará dentro del if
    Pedido.find({ estado: queryPedido }).exec(function (error, estadoInfo) { //Buscara los estados, que le hemos pasado por la query y si el estado es 200 nos creara un json con la respuesta.
      if (error) res.status(500).send(error);
      else res.status(200).json(estadoInfo);
    });
  }else{
    Pedido.find().exec(function (error, estadoInfo) { //Si no lo encuentra nos mostrará un array vacio, y si la query está vacia todos los pedidos.
      if (error) res.status(500).send(error);
      else res.status(200).json(estadoInfo);
    });
  }
})

/*GET - Mostrar datos de un pedido*/
router.get('/:id', function (req, res, next) {
  Pedido.findById(req.params.id, function (err, pedidoinfo) {
    if (err) res.status(500).send(err);
    else res.status(200).json(pedidoinfo);
  });
});


/*DELETE - Borrar un pedido*/
router.delete('/:id', function (req, res, next) {
  Pedido.findByIdAndDelete(req.params.id, function (err, pedidoinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

/*PUT - Actualizar estado de un producto*/
router.put('/upgradePedido/:id',function (req, res, next) {
  Pedido.findByIdAndUpdate(req.params.id, req.body, function (err) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  })
});

module.exports = router;
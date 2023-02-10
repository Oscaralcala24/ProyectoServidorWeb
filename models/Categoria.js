var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Producto = require('../models/Producto.js');
var Pedido = require('../models/Pedido.js');
var db = mongoose.connection;

var categoriaSchema = new Schema({
    id_categoria:{type:Schema.ObjectId},
    nombre_categoria:{type: String , required: true},
})

module.exports = mongoose.model('Categoria', categoriaSchema);
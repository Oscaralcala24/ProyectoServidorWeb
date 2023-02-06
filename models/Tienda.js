var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Producto = require('../models/Producto.js');
var Pedido = require('../models/Pedido.js');
var db = mongoose.connection;

var tiendaSchema = new Schema({
    id_tiendas:{type:Schema.ObjectId},
    nombre_tienda:{type: String , required: true},
    ciudad:{type: String , required: true},
    stock:
    [{
    producto:{
        type:Schema.ObjectId,
        ref: 'Producto'
    },
    cantidad:{
        type: Number
    }
    }],
    id_pedido:[{
        type: Schema.ObjectId,
        ref: 'Pedido'
    }]
})

module.exports = mongoose.model('Tienda', tiendaSchema);

//{producto: id_producto, cantidad:cantidad]
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var productos = require('./Producto.js');
var pedidos = require('./Pedido.js');

var tiendaSchema = new Schema({
    id_tiendas:{type:Schema.ObjectId},
    nombre_tienda:{type: String , required: true},
    ciudad:{type: String , required: true},
    sku_productos:[{
        type:Schema.ObjectId,
        ref: 'Producto'
    }],
    id_pedido:[{
        type: Schema.ObjectId,
        ref: 'Pedido'
    }]
})

module.exports = mongoose.model('Tienda', tiendaSchema);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productoEsquema = new Schema({
sku: {type:Schema.ObjectId },
nombre: { type: String, required: true },
tipo: { type: String, required: true },
precio: { type: Number, required: true },
});
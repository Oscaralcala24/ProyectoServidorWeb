var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Producto = require('../models/Producto.js');
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;
var db = mongoose.connection;

var usuarioSchema = new Schema({
    dni: {
        type: String, required: true, index: { unique: true }
    },
    nombre: {
        type: String, required: true
    },
    apellidos: {
        type: String, required: true
    },
    email: { type: String, required: true },
    telefono: { type: Number, required: true },
    contrasenia: { type: String, required: true },
    direccion: { type: String, required: true },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    //Referencia Producto favorito
    favorito: [{
        type: Schema.ObjectId,
        ref: 'Producto',
        default: null
    }]
});

//Password
usuarioSchema.pre('save', function (next) {
    var user = this;
    // solo aplica una función hash al password si ha sido modificado (o es nuevo)
    if (!user.isModified('contrasenia')) return next();
    // genera la salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        // aplica una función hash al password usando la nueva salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            // sobrescribe el password escrito con el “hasheado”
            user.password = hash;
            next();
        });
    });
});
usuarioSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword,
        this.password,
        function (err,
            isMatch) {
            if (err) return cb(err);
            cb(null, isMatch);
        });
};

module.exports = mongoose.model('Usuario', usuarioSchema);
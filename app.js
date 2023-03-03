require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
require('dotenv').config()
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { body,validationResult } = require('express-validator');

var indexRouter = require('./routes/index');
var pedidoRouter = require('./routes/pedido');
var productoRouter = require('./routes/producto');
var varianteProducto = require('./routes/varianteProducto');
var usuarioRouter = require('./routes/usuario');

var mongoose = require('mongoose');
mongoose.set('strictQuery', false);

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true })
.then(() => console.log('connection successful'))
.catch((err) => console.error(err));

var db = mongoose.connection;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/pedido',pedidoRouter);
app.use('/producto',productoRouter);
app.use('/VarianteProducto',varianteProducto);
app.use('/usuario',usuarioRouter);

/*Express-Validator-Pedido*/
app.get('/express-validatorPedido', function (req, res) {
  res.render('crearPedido')
})

app.post('/registrarPedido',[
  body('estado','Ingrese un estado Correcto').isEmpty().exists(),
  body('fecha','Ingrese una fecha Correcta').isDate(),
  body('cantidad','Ingresa una cantidad por favor').exists().isNumeric(),
  body('Producto','Ingresa el id de un producto por favor').exists(),
  body('usuario','Ingresa el id de un usuario por favor').exists()
],(req, res) => {
  const errors = validationResult(req);
  // if(!errors.isEmpty()){ //NOS GUARDA EN UN ARRAY TODOS LOS ERRORES. NOS LO GUARDA EN EL ARRAY ERRORS
  //   return res.status(400).json({errors: errors.array()});
  // }

  if(!errors.isEmpty()){
    console.log(req.body)
    const valores = req.body
    const validaciones = errors.array()
    res.render('crearPedido.ejs',{validaciones:validaciones,valores:valores})
  }else{
    res.send('!Validacion Correcta¡')
  }
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
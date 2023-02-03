var createError = require('http-errors');
var express = require('express');
var path = require('path');
require('dotenv').config()
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pedidoRouter = require('./routes/pedido');
var productoRouter = require('./routes/producto');
var tiendaRouter = require('./routes/tienda');
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
app.use('/users', usersRouter);
app.use('/pedido',pedidoRouter);
app.use('/producto',productoRouter);
app.use('/tienda',tiendaRouter);
app.use('/usuario',usuarioRouter);

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
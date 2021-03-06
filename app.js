var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var verifyAuth = require('./my_modules/verify-auth');

var authRouter = require('./routes/auth');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var customersRouter = require('./routes/customers');
var cateringsRouter = require('./routes/caterings');
var packetsRouter = require('./routes/packets');
var chargeRouter = require('./routes/charge');
var ordersRouter = require('./routes/orders');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/caterings', cateringsRouter);
app.use('/charge', chargeRouter);
app.use('/auth', authRouter);
app.use(verifyAuth);
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/packets', packetsRouter);
app.use('/orders', ordersRouter);
app.use('/customers', customersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
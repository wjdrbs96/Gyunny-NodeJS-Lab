var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

let room = ['room1', 'room2', 'room3'];
let a = 0;

var app = express();
app.io = require('socket.io')();

app.io.on('connection',(socket) => {

  console.log("유저가 들어왔다.")

  // 요거 추가
  socket.on('joinRoom', (num, name) => {
    socket.join(room[num], () => {
      app.io.to(room[num]).emit('joinRoom', num, name);
    });
  });

  // 요거 추가
  socket.on('leaveRoom', (num, name) => {
    socket.leave(room[num], () => {
      app.io.to(room[num]).emit('leaveRoom', num, name);
    });
  });

  socket.on('disconnect', () => {
    console.log('유저가 나갔다.');
  });

  socket.on('chat-msg', (num, name, msg) => {
    a = num;
    app.io.to(room[a]).emit('chat-msg', name, msg); // to(room[a])를 통해 그룹에게만 메세지를 날린다.
  });

});

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

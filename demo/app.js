const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'hooman',
  database: 'my_db'
});

connection.connect();

app.use((req, res, next) => {
  next();
});

app.get('/cities', (req, res) => {
  let user_id = req.query.uid;
  connection.query('select * from city where user_id = ?', [user_id], (err, rows) => {
    if (err) throw err;
    res.header({'Access-Control-Allow-Origin': '*'}).json(rows);
  })
});

app.post('/city', (req, res) => {
  let city_id = req.query.cid;
  connection.query('insert into city (id, user_id) values (?,?)', [city_id, 1], (err, rows) => {
    if (err) throw err;
    res.header({'Access-Control-Allow-Origin': '*'}).json(rows);
  })
});

app.delete('/city', (req, res) => {
  let city_id = req.query.cid;
  connection.query('delete from city where user_id = 1 and id = ?', [city_id], (err, rows) => {
    if (err) throw err;
    res.header({'Access-Control-Allow-Origin': '*'}).json(rows);
  })
});

app.post('/user', (req, res) => {
  let name = req.body.name;
  let username = req.body.username;
  let password = req.body.password;
  if (name && username && password) {
    connection.query('insert into user (name, username, password) values(?,?,?)', [name, username, password], (err, rows) => {
      if (err) throw err;
      res.header({'Access-Control-Allow-Origin': '*'}).json(rows);
    });
  } else {
    res.sendStatus(500);
  }
});

app.options('/*', (req, res) => {
  res.header({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
  }).end();
});

// connection.end();

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

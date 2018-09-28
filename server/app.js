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
const myHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': '*'
  // 'Access-Control-Request-Headers': '*'
  // 'Access-Control-Request-Method': 'GET'
};

connection.connect();
app.use((req, res, next) => {
  res.header(myHeaders);
  next();
});

app.get('/cities', (req, res) => {
  let username = req.query.username;
  connection.query('select u.id as user_id, c.id as id from city c inner join user u on c.user_id = u.id where u.username = ?', [username], (err, rows) => {
    if (err) throw err;
    res.json(rows);
  })
});

app.post('/city', (req, res) => {
  let city_id = req.body.cid;
  let username = req.body.username;
  connection.query('select u.id from user u where u.username = ?', [username], (err, rows) => {
    if (err) throw err;
    const user_id = rows[0].id;
    connection.query('insert into city (id, user_id) values (?,?)', [city_id, user_id], (err, rows) => {
      if (err) throw err;
      res.json(rows);
    })
  });
});

app.delete('/city', (req, res) => {
  let city_id = req.query.cid;
  let username = req.query.username;
  connection.query('select u.id from user u where u.username = ?', [username], (err, rows) => {
    if (err) throw err;
    const user_id = rows[0].id;
    connection.query('delete from city where id = ? and user_id = ?', [city_id, user_id], (err, rows) => {
      // if (err) throw err;
      res.json(rows);
    });
  });
});

app.post('/user', (req, res, next) => {
  let name = req.body.name;
  let username = req.body.username;
  let password = req.body.password;

  if (!(name && username && password)) {
    res.sendStatus(400);
  } else {
    connection.query('select * from user where username=?', [username], (err, rows) => {
      if (err) throw err;
      if (rows.length > 0) {
        res.sendStatus(403);
      }
      else {
        connection.query('insert into user (name, username, password) values(?,?,?)', [name, username, password], (err, rows) => {
          if (err) throw err;
          res.json(rows);
        });
      }
    });
  }
});

app.post('/user/login', (req, res) => {
  let user = req.body.username;
  let pass = req.body.password;

  if (!(user && pass)) {
    res.sendStatus(400);
  } else {
    connection.query('select * from user where username = ? and password = ?', [user, pass], (err, rows) => {
      if (err) throw err;
      if (rows.length > 1) {
        resSendStatus(500);
      } else if (rows.length < 1) {
        res.sendStatus(404);
      } else if (rows.length === 1) {
        res.json(rows[0].name);
      }
    })
  }
});

app.options('/*', (req, res) => {
  res.header(myHeaders).end();
});

// connection.end();

/*
app.use('/', indexRouter);
app.use('/users', usersRouter);
*/

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

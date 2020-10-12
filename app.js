const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const basicAuth = require('express-basic-auth');

//helmet : ซ่อน header
//cors : fe, be ต่างเครื่อง

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');

const app = express();

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//localhost:3000/api
app.use('/api', indexRouter); 
//localhost:3000/api/users
app.use('/api/users', usersRouter); 
//localhost:3000/api/blog
app.use('/api/blog', basicAuth({
    users: { 'admin': '1234' },
    challenge: true
}) ,blogRouter); 

module.exports = app;

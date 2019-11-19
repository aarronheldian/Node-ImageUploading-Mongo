const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const image = require('./routes/image');

const options = {
  server: {socketOptions: {keepAlive: 300000, connectTimeoutMS: 30000}},
  replset: {socketOptions: {keepAlive: 300000, connectTimeoutMS: 30000}}
};

mongoose.connect('mongodb://localhost/multer');
var db = mongoose.connection;

db.on('error', function (err){
  console.log(err);
});

db.once('open', function(){
  console.log('handshake established');
});

// Init app
const app = express();

app.set('views', path.join(__dirname, 'views'));

// EJS
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', image);

app.set('port', (process.env.PORT) || 8080);

app.listen(app.get('port'), function(){
 console.log(`Server started on port 8080`);
});

module.exports = app;
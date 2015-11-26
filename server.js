/*
var express = require('express');
var app = express();
var bodyParser = require('body-parser');   */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cs5610experiments');
var db = mongoose.connection;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.bodyParser());

app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

require("./public/experiments/nodejs/angularjsClient/server.js")(app);
require("./public/experiments/angular/jsonp/server/services/MovieService.js")(app);
require("./public/experiments/movies/server/services/movie.service.js")(app);
//require("./public/assignment/server/services/user.service.js") (app);
require("./public/assignment/server/app.js")(app, mongoose, db);
require("./public/experiments/mongo/server/app.js")(app, mongoose, db);

app.listen(port, ipaddress);
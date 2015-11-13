/*
var express = require('express');
var app = express();
var bodyParser = require('body-parser');   */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.bodyParser());

app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

require("./public/experiments/nodejs/angularjsClient/server.js")(app);
require("./public/experiments/angular/jsonp/server/services/MovieService.js")(app);
require("./public/experiments/movies/server/services/movie.service.js")(app);
require("./public/assignment/server/services/user.service.js")(app);
//require("./public/assignment/server/services/form.service.js")(app);
//require("./public/assignment/server/services/field.service.js")(app);

app.listen(port, ipaddress);
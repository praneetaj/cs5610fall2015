
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var mongoose = require('mongoose');


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;


var connectionString = 'mongodb://127.0.0.1:27017/cs5610';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);

/*
var mongo_url = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/cs5610experiments';
console.log(mongo_url);
mongoose.connect(mongo_url);
var db = mongoose.connection; */


require("./public/experiments/mongo/server/app.js")(app, mongoose, db);
require("./public/assignment/server/app.js")(app, mongoose, db);

app.listen(port, ipaddress);

/*
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cs5610experiments');
var db = mongoose.connection;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

    */
var http = require('http');
var request = require('request');
var querystring = require('querystring');
var locuApiKey = require("./locuApiKey.js");

module.exports = function (app) {
    //app.get("/api/project/locu/:locuId", searchFromLocuByLocuId);
    app.get("/api/project/google", findRestaurantByNameAndCity);

    function searchFromLocuByLocuId (req, res) {
        var searchquery = {"api_key" : locuApiKey.apiKey,"fields" : [ "location", "name", "menus"],"venue_queries" : [{"locu_id" : req.params.locuId}]};


        request({
            url: "https://api.locu.com/v2/venue/search",
            method: "POST",
            json: true,
            body: searchquery
        }, function (error, response, body){


            console.log(response.data.body.results[0].photos[0].photo_reference);
            res.json(response);
        });
    }

    function findRestaurantByNameAndCity (req, res) {
        var name = req.query.restaurantName;
        var city = req.query.city;
        var searchUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + name + "+" + city + "&key=AIzaSyAACI9XfeyMudOG9WcDtMrCFGZ5xpeNGKA";

        request({
            url: searchUrl,
            method: "GET",
            json: true
        }, function (error, response, body){
            console.log(response);
            //res.json(response);

            var photo_reference = response.body.results[0].photos[0].photo_reference;
            var photoquery = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + photo_reference + "&key=AIzaSyAACI9XfeyMudOG9WcDtMrCFGZ5xpeNGKA";
            console.log(response);
            request({
                url: photoquery,
                method: "GET",
                json: true
            }, function (error, photo, body2) {
                console.log(photo.request.uri.href);
                //console.log(photo.headers['location']);
                res.json(photo.request.uri.href);
            });
        });
    }

    function searchFromLocu (req, res) {
        var searchquery = {"api_key" : locuApiKey.apiKey,"fields" : [ "locu_id", "name", "menus"],"venue_queries" : [{"name": "Lunchbox laboratory"}, {"location" : {"locality" : "Seattle"}}]};

        request({
            url: "https://api.locu.com/v2/venue/search",
            method: "POST",
            json: true,
            body: searchquery
        }, function (error, response, body){
            res.json(response);
        });
    }
};
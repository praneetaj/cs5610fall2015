var http = require('http');
var request = require('request');
var querystring = require('querystring');
var locuApiKey = require("./locuApiKey.js");

module.exports = function (app) {
    app.get("/api/project/locu/:locuId", searchFromLocuByLocuId);
    app.get("/api/project/locu", findRestaurantByNameAndCity);

    function searchFromLocuByLocuId (req, res) {
        var searchquery = {"api_key" : locuApiKey.apiKey,"fields" : [ "description", "website_url", "contact", "location", "name", "menus"],"venue_queries" : [{"locu_id" : req.params.locuId}]};

        request({
            url: "https://api.locu.com/v2/venue/search",
            method: "POST",
            json: true,
            body: searchquery
        }, function (error, response, body){
            console.log(response);
            res.json(response);
        });
    }

    function findRestaurantByNameAndCity (req, res) {
        var name = req.query.restaurantName;
        var city = req.query.city;
        var searchQuery = {"api_key" : locuApiKey.apiKey, "fields" : [ "locu_id", "name", "location" ], "venue_queries" : [{"name" : name, "location" : {"locality": city}}]};

        request({
            url: "https://api.locu.com/v2/venue/search",
            method: "POST",
            json: true,
            body: searchQuery
        }, function (error, response, body){
            console.log(response);
            res.json(response);
        });
    }
};
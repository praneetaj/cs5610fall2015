var http = require('http');
var request = require('request');
var querystring = require('querystring');

module.exports = function (app) {
    app.get("/api/project/google", findRestaurantByNameAndCity);

    function findRestaurantByNameAndCity (req, res) {
        var name = req.query.restaurantName;
        var city = req.query.city;
        var searchUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + name + "+" + city + "&key=AIzaSyAACI9XfeyMudOG9WcDtMrCFGZ5xpeNGKA";

        request({
            url: searchUrl,
            method: "GET",
            json: true
        }, function (error, response, body){

            var photo_reference = response.body.results[0].photos[0].photo_reference;
            var photoquery = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&maxheight=250&photoreference=";
            photoquery = photoquery + photo_reference + "&key=AIzaSyAACI9XfeyMudOG9WcDtMrCFGZ5xpeNGKA";
            request({
                url: photoquery,
                method: "GET",
                json: true
            }, function (error, photo, body2) {
                res.json(photo.request.uri.href);
            });
        });
    }
};
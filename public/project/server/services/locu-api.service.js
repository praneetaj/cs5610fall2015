var http = require('http');
var request = require('request');
var querystring = require('querystring');

module.exports = function (app) {
    app.get("/api/project/locu", searchFromLocu);

    function searchFromLocu (req, res) {
        console.log("reached server");
        var searchquery = {"api_key" : "729f5b92b7be3b4e9f4aacb019d3ce4d9e19788d","fields" : [ "name", "menus"],"venue_queries" : [{"name": "Lunchbox laboratory"}, {"location" : {"locality" : "Seattle"}}]};

        request({
            url: "https://api.locu.com/v2/venue/search",
            method: "POST",
            json: true,   // <--Very important!!!
            body: searchquery
        }, function (error, response, body){
            console.log(response);
            res.json(response);
        });

        /*
        request.post(
            'https://api.locu.com/v2/venue/search',
            {
                "api_key" : "729f5b92b7be3b4e9f4aacb019d3ce4d9e19788d",
                "fields" : [ "name", "menus"],
                "venue_queries" : [
                    {
                        "location" : {
                            "locality": "Boston"
                        }
                    }
                ]
            },
            function (error, response, body) {
                console.log(error);
                console.log(body);
                if (!error && response.statusCode == 200) {
                    console.log(body)
                }
            }
        );  */

        /*
        http({
            method : 'POST',
            url : "https://api.locu.com/v2/venue/search",
            headers: {'Content-Type': 'application/json'},
            data : angular.fromJson(searchquery)
        }).then(function(response){
            console.log(response);
            res.json (response);
        });  */
    }
};
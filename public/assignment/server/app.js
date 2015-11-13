// Talk to server here
module.exports = function (app) {
	//http requests
	//this file will be required in server.js
    require("./services/movie.service.js")(app);
};
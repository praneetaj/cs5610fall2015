// You check if the user exists in this file
var model = require("../models/user.model.js")();

module.exports = function (app) {
//	app.get("/login", login);
//	app.post("/register", register);
	app.get("/api/assignment/user/username=:currUsername&password=:currPassword", getUserByUsernameAndPassword);
	app.put("/api/assignment/user/:id", updateUser);

	function getUserByUsernameAndPassword (req, res) {
		var credentials = {
			"username" : req.params.currUsername,
			"password" : req.params.currPassword
		};
		res.json(model.findUserByCredentials(credentials));
	}

	function updateUser (req, res) {
		var id = req.params.id;
		var updatedUser = req.body;
		res.json(model.updateUser(id, updatedUser));
	}

//	function login(req, res) {}
//	function register(req, res) {}
};
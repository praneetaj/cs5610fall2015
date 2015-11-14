var model = require("../models/user.model.js")();

module.exports = function (app) {
	app.post("/api/assignment/user", createUser);
	app.get("/api/assignment/user", findAllUsers);
	app.get("/api/assignment/user/:id", findUserById);
	app.get("/api/assignment/user/username=:username", findUserByUsername);
	app.get("/api/assignment/user/username=:currUsername&password=:currPassword", getUserByUsernameAndPassword);
	app.put("/api/assignment/user/:id", updateUser);
	app.delete("/api/assignment/user/:id", deleteUser);

	function createUser (req, res) {
		var newuser = req.body;
		res.json(model.createUser(newuser));
	}

	function findAllUsers (req, res) {
		res.json(model.findAllUsers());
	}

	function findUserById (req, res) {
		var id = req.params.id;
		res.json(model.findUserById(id));
	}

	function findUserByUsername (req, res) {
		var username = req.params.username;
		res.json(model.findUserByUsername(username));
	}

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

	function deleteUser (req, res) {
		var id = req.params.id;
		res.json(model.deleteUser(id));
	}
};
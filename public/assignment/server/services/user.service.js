module.exports = function (app, model) {
	app.get("/api/assignment/user/username=:username&password=:password", findUserByUsernameAndPassword);
	app.post("/api/assignment/user", createUser);
	app.get("/api/assignment/user", findAllUsers);
//	app.get("/api/assignment/user/:userId", findUserById);
	app.put("/api/assignment/user/:userId", updateUser);
//	app.delete("/api/assignment/user/:userId", deleteUser);
//	app.get("/api/assignment/user/username=:username", findUserByUsername);

	function createUser (req, res) {
		model
			.createUser (req.body)
			.then (function (user) {
				res.json (user);
			});
	}

	function findUserByUsernameAndPassword (req, res) {
		var credentials = {
			"username" : req.params.username,
			"password" : req.params.password
		};
		model
			.findUserByUsernameAndPassword (credentials)
			.then (function (user) {
				res.json (user);
			});
	}

	function findAllUsers (req, res) {
		model
			.findAllUsers ()
			.then (function (users) {
				res.json (users);
			});
	}

	function updateUser (req, res) {
		var id = req.params.userId;
		var updatedUser = req.body;
		model
			.updateUser (id, updatedUser)
			.then (function (user) {
				res.json (user);
			});
	}

	/*
	function findAllUsers (req, res) {
		res.json(model.findAllUsers());
	}

	function findUserById (req, res) {
		var id = req.params.userId;
		res.json(model.findUserById(id));
	}

	function findUserByUsername (req, res) {
		var username = req.params.username;
		res.json(model.findUserByUsername(username));
	}

	function findUserByUsernameAndPassword (req, res) {
		var credentials = {
			"username" : req.params.username,
			"password" : req.params.password
		};
		res.json(model.findUserByCredentials(credentials));
	}

	function updateUser (req, res) {
		var id = req.params.userId;
		var updatedUser = req.body;
		res.json(model.updateUser(id, updatedUser));
	}

	function deleteUser (req, res) {
		var id = req.params.userId;
		res.json(model.deleteUser(id));
	}*/
};
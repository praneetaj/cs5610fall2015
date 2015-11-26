module.exports = function (app, model) {
	app.get("/api/assignment/user/username=:username&password=:password", findUserByUsernameAndPassword);
	app.post("/api/assignment/user", createUser);
	app.get("/api/assignment/user", findAllUsers);
	app.get("/api/assignment/user/:userId", findUserById);
	app.put("/api/assignment/user/:userId", updateUser);
	app.delete("/api/assignment/user/:userId", deleteUser);
	app.get("/api/assignment/user/username=:username", findUserByUsername);

	function createUser (req, res) {
		model
			.createUser (req.body)
			.then (function (user) {
				if (user != null)
					console.log ("server side services, null user");
				res.json (user);
			});
	}

	function findUserByUsernameAndPassword (req, res) {
		var credentials = {
			"username" : req.params.username,
			"password" : req.params.password
		};
		model
			.findUserByCredentials (credentials)
			.then (function (user) {
				console.log(user);
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

	function findUserById (req, res) {
		model
			.findUserById (req.params.id)
			.then (function (user) {
				res.json (user);
			});
	}

	function deleteUser (req, res) {
		model
			.deleteUser (req.params.id)
			.then (function (status) {
				res.json (status);
			});
	}

	function findUserByUsername (req, res) {
		model
			.findUserByUsername (req.params.id)
			.then (function (user) {
				res.json (user);
			});
	}
};
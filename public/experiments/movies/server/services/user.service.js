// You check if the user exists in this file
module.exports = function (app) {
	app.get("/login", login);
	app.post("/register", register);

	function login(req, res) {

	}
	function register(req, res) {

	}
}
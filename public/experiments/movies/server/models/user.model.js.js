// You will have the CRUD operations on user here
var users = require("../user.mock.json");

module.exports = function (app, db) {
	var api = {
		create : create,
		findAll : findAll,
		findById : findById,
		findByCredentials : findByCredentials,
		update : update,
		remove : remove
	};
	return api;
	function create (user) {
		users.push(user);
		return users;
	}

	function findAll() {
		return users;
	}

	function findById() {
	}

	function findByCredentials() {}
	function update() {}
	function remove() {}
}
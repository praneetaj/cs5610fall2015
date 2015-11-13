// You will have the CRUD operations on user here
var users = require("user.mock.json");

module.exports = function (app) {
	var api = {
		create : create,
		findAll : findAll,
		findById : findById,
		update : update,
		remove : remove,
		findUserByUsername: findUserByUsername,
		findUserByCredentials : findUserByCredentials
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

	function findUserByUsername() {

	}

	function findUserByCredentials() {}
	function update() {}
	function remove() {}
};
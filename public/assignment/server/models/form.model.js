// You will have the CRUD operations on user here
var users = require("form.mock.json");

module.exports = function (app, db) {
	var api = {
		create : create,
		findAll : findAll,
		findById : findById,
		update : update,
		remove : remove,
		findFormByTitle : findFormByTitle
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

	function update() {}
	function remove() {}
	function findFormByTitle() {}
};
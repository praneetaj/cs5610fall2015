// You will have the CRUD operations on user here

var users = require("./user.mock.json");

module.exports = function (app) {
	var api = {
		createUser : createUser,
		findAllUsers : findAllUsers,
		findUserById : findUserById,
		updateUser : updateUser,
		deleteUser : deleteUser,
		findUserByUsername: findUserByUsername,
		findUserByCredentials : findUserByCredentials
	};
	return api;

	function guid() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
			s4() + '-' + s4() + s4() + s4();
	}

	function createUser (newuser) {
		var user = {
			id : guid(),
			username : newuser.username,
			password : newuser.password,
			email : newuser.email,
			firstName : newuser.firstName,
			lastName : newuser.lastName
		};
		users.push(user);
		return users;
	}

	function findAllUsers() {
		return users;
	}

	function findUserById (id) {
		var toReturn = null;
		for (var i = 0; i < users.length; i++) {
			if (users[i].id == id) {
				toReturn = users[i];
				break;
			}
		}
		return toReturn;
	}

	function findUserByUsername (username) {
		var toReturn = null;
		for (var i = 0; i < users.length; i++) {
			if (users[i].username == username) {
				toReturn = users[i];
				break;
			}
		}
		return toReturn;
	}

	function findUserByCredentials (credentials) {
		var toReturn = null;
		for (var i = 0; i < users.length; i++) {
			if (users[i].username == credentials.username && users[i].password == credentials.password) {
				toReturn = users[i];
				break;
			}
		}
		return toReturn;
	}

	function updateUser (id, updatedUser) {
		for (var index = 0; index < users.length; index++) {
			if (users[index].id == id) {
				users[index].userName = updatedUser.userName;
				users[index].password = updatedUser.password;
				users[index].email = updatedUser.email;
				users[index].firstName = updatedUser.firstName;
				users[index].lastName = updatedUser.lastName;
				break;
			}
		}
		return users;
	}

	function deleteUser (id) {
		for (var index = 0; index < users.length; index++) {
			if (users[index].id == id) {
				users.splice(index, 1);
				break;
			}
		}
		return users;
	}
};
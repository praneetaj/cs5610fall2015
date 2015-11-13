// You will have the CRUD operations on user here
var users = [
	{"id": 123, "firstName": "Alice", 	"lastName": "Wonderland",	"username": "alice", 	"password": "alice"},
	{"id": 234, "firstName": "Bob",	"lastName": "Hope", 		"username": "bob", 	"password": "bob"},
	{"id": 345, "firstName": "Charlie",	"lastName": "Brown", 		"username": "charlie", "password": "charlie"},
	{"id": 456, "firstName": "Dan",	"lastName": "Craig", 		"username": "dan", 	"password": "dan"},
	{"id": 567, "firstName": "Edward",	"lastName": "Norton", 		"username": "ed",	"password": "ed"}
];

module.exports = function (app) {
	var api = {
		create : create,
		findAll : findAll,
		findUserById : findUserById,
		updateUser : updateUser,
		deleteUser : deleteUser,
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

	function findUserByCredentials(credentials) {
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
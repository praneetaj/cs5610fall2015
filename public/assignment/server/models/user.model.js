//var users = require("./user.mock.json");
var uuid = require('node-uuid');

module.exports = function (app) {
	var UserSchema = require ("./user.schema.js") (mongoose);
	var UserModel = mongoose.model ("UserModel", UserSchema);

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

	function createUser (newuser) {
		var deferred = q.defer ();

		UserModel.create (newuser, function (err, user) {
			if (err)
				deferred.reject (err);
			else
				deferred.resolve (user);
		});
		return deferred.promise;
	}

	function findAllUsers () {
		var deferred = q.defer ();

		UserModel.find (function (err, users) {
			if (err)
				deferred.reject (err);
			else
				deferred.resolve (users);
		});
		return deferred.promise;
	}

	function findUserById (id) {
		var deferred = q.defer ();

		UserModel.findById (id, function (err, user) {
			if (err)
				deferred.reject (err);
			else
				deferred.resolve (user);
		});
		return deferred.promise;
	}

	function updateUser (id, updatedUser) {
		var deferred = q.defer ();

		updatedUser.delete ("_id");

		UserModel.update ({_id: id}, {$set: updatedUser}, function (err, user) {
			if (err)
				deferred.reject (err);
			else
				deferred.resolve (user);
		});
		return deferred.promise;
	}


	/*
	function createUser (newuser) {
		var user = {
			id : uuid.v1(),
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
	}  */
};
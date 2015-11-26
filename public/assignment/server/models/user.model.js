//var users = require("./user.mock.json");
var q = require ("q");
var uuid = require('node-uuid');

module.exports = function (mongoose, db) {
	var UserSchema = require ("./user.schema.js") (mongoose);
	var UserModel = mongoose.model ("UserModel", UserSchema);

	var api = {
		createUser : createUser,
		findAllUsers : findAllUsers,
		findUserById : findUserById,
		updateUser : updateUser,
		deleteUser : deleteUser,
		findUserByCredentials : findUserByCredentials,
		findUserByUsername: findUserByUsername
	};
	return api;

	function createUser (newuser) {
		var deferred = q.defer ();

		UserModel.create (newuser, function (err, user) {
			if (err)
				deferred.reject(err);
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

		//updatedUser.delete ("_id");

		UserModel.update ({_id: id}, {$set: updatedUser}, function (err, user) {
			if (err)
				deferred.reject (err);
			else
				deferred.resolve (user);
		});
		return deferred.promise;
	}

	function deleteUser (id) {
		var deferred = q.defer ();

		UserModel.remove (id, function (err, status) {
			if (err)
				deferred.reject (err);
			else
				deferred.resolve (status);
		});
		return deferred.promise;
	}

	function findUserByCredentials (credentials) {
		var deferred = q.defer ();

		UserModel.find ({$and : [{username : credentials.username}, {password : credentials.password}]}, function (err, user) {
			if (err)
				deferred.reject (err);
			else
				deferred.resolve (user);
		});
		return deferred.promise;
	}

	function findUserByUsername (username) {
		var deferred = q.defer ();

		UserModel.find ({username : username}, function (err, user) {
			if (err)
				deferred.reject (err);
			else
				deferred.resolve (user);
		});
		return deferred.promise;
	}
};
var q = require ("q");

module.exports = function (mongoose, db) {
    var UserSchema = require ("./user.schema.js") (mongoose);
    var ProjectUserModel = mongoose.model ("ProjectUserModel", UserSchema);

    var api = {
        createUser : createUser,//p
        findAllUsers : findAllUsers,//p
        findAllCustomers : findAllCustomers,
        findUserById : findUserById,
        updateUser : updateUser,
        deleteUser : deleteUser,
        findUserByCredentials : findUserByCredentials,//p
        findUserByUsername: findUserByUsername
    };
    return api;

    function createUser (newuser) {
        var deferred = q.defer ();

        ProjectUserModel.create (newuser, function (err, user) {
            if (err)
                deferred.reject(err);
            else
                deferred.resolve (user);
        });
        return deferred.promise;
    }

    function findAllUsers () {
        var deferred = q.defer ();

        ProjectUserModel.find (function (err, users) {
            if (err)
                deferred.reject (err);
            else {
                for (var i = 0; i < users.length; i++) {
                    users[i].password = null;
                }
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }

    function findAllCustomers () {
        var deferred = q.defer ();

        ProjectUserModel.find ({"role" : "CUSTOMER"}, function (err, users) {
            if (err)
                deferred.reject (err);
            else {
                for (var i = 0; i < users.length; i++) {
                    users[i].password = null;
                }
                console.log(users);
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }

    function findUserById (id) {
        var deferred = q.defer ();

        ProjectUserModel.findById (id, function (err, user) {
            if (err)
                deferred.reject (err);
            else
                deferred.resolve (user);
        });
        return deferred.promise;
    }

    function updateUser (id, updatedUser) {
        var deferred = q.defer ();

        delete updatedUser["_id"];

        ProjectUserModel.update ({"_id" : id}, {$set: updatedUser}, function (err, user) {
            if (err)
                deferred.reject (err);
            else
                deferred.resolve (user);
        });
        return deferred.promise;
    }

    function deleteUser (id) {
        var deferred = q.defer ();

        ProjectUserModel.remove ({"_id" : id}, function (err, status) {
            if (err)
                deferred.reject (err);
            else
                deferred.resolve (status);
        });
        return deferred.promise;
    }

    function findUserByCredentials (credentials) {
        var deferred = q.defer ();

        ProjectUserModel.findOne ({$and : [{loyalUUsername : credentials.username}, {password : credentials.password}]}, function (err, user) {
            if (err)
                deferred.reject (err);
            else
                deferred.resolve (user);
        });
        return deferred.promise;
    }

    function findUserByUsername (username) {
        var deferred = q.defer ();

        ProjectUserModel.findOne ({"loyalUUsername" : username}, function (err, user) {
            if (err)
                deferred.reject (err);
            else
                deferred.resolve (user);
        });
        return deferred.promise;
    }
};
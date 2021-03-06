var q = require ("q");

module.exports = function (mongoose, db, passport, LocalStrategy) {
    var UserSchema = require ("./user.schema.js") (mongoose);
    var ProjectUserModel = mongoose.model ("ProjectUserModel", UserSchema);

    var api = {
        createUser : createUser,
        findAllUsers : findAllUsers,
        findAllCustomers : findAllCustomers,
        findUserById : findUserById,
        updateUser : updateUser,
        deleteUser : deleteUser,
        updatePassword : updatePassword,
        findUserByCredentials : findUserByCredentials,
        findUserByUsername: findUserByUsername
    };

    passport.use(new LocalStrategy( {
            usernameField: 'loyalUUsername',
            passwordField: 'password'
    },
        function(loyalUUsername, password, done)
        {
            ProjectUserModel.findOne({loyalUUsername: loyalUUsername, password: password}, function(err, user)
            {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                return done(null, user);
            })
        }));

    passport.serializeUser(function(user, done)
    {
        done(null, user);
    });

    passport.deserializeUser(function(user, done)
    {
        ProjectUserModel.findById(user._id, function(err, user)
        {
            done(err, user);
        });
    });

    return api;

    function updatePassword (id, updateUser) {
        var deferred = q.defer ();

        ProjectUserModel.findById (id, function (err, user) {
            if (err)
                deferred.reject (err);
            else {
                if (user.password == updateUser.old) {
                    console.log (user);
                    console.log(updateUser);
                    var newnew = {
                        loyalUUsername : user.loyalUUsername,
                        password : updateUser.new,
                        googleUsername : null, //not sure if google api returns this
                        googleId : null,
                        email : user.email,
                        role : user.role,
                        restLocuId : user.restLocuId,
                        firstName : user.firstName,
                        lastName : user.lastName
                    };
                    delete user["_id"];
                    console.log ("user");
                    user.password = updateUser.new;
                    ProjectUserModel.update ({"_id" : id}, {$set: newnew}, function (err, res) {
                        console.log("inside update");
                        if (err)
                            deferred.reject (err);
                        else
                            deferred.resolve (res);
                    });
                } else {
                    console.log ("passwords did not match");
                    deferred.resolve('0');
                }
            }
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
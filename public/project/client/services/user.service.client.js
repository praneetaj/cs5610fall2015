"use strict";
(function () {
    angular
        .module("LoyalUApp")
        .factory("UserService", UserService);

    function UserService ($http, $q) {

        var api = {
            createUser : createUser,
            findUserByUsernameAndPassword : findUserByUsernameAndPassword
        };
        return api;

        function createUser (user) {
            var deferred = $q.defer();
            $http
                .post("/api/project/user", user)
                .success(function(user){
                    deferred.resolve(user);
                });

            return deferred.promise;
        }

        function findUserByUsernameAndPassword (username, password) {
            var deferred = $q.defer();
            $http
                .get("/api/project/user?username=" + username + "&password=" + password)
                .success(function(user){
                    deferred.resolve(user);
                });

            return deferred.promise;
        }
    }
}) ();
"use strict";
(function () {
    angular
        .module("LoyalUApp")
        .factory("UserService", UserService);

    function UserService ($http, $q) {

        var api = {
            createUser : createUser,
            findUserByUsernameAndPassword : findUserByUsernameAndPassword,
            findUserByUsername : findUserByUsername,
            findAllUsers : findAllUsers,
            findAllCustomers : findAllCustomers
        };
        return api;

        function findAllUsers () {
            var deferred = $q.defer();
            $http
                .get("/api/project/user")
                .success(function(users){
                    deferred.resolve(users);
                });

            return deferred.promise;
        }

        function findAllCustomers () {
            var deferred = $q.defer();
            $http
                .get("/api/project/customer")
                .success(function(customers){
                    console.log("find all customers");
                    deferred.resolve(customers);
                });

            return deferred.promise;
        }

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

        function findUserByUsername (username) {
            var deferred = $q.defer();
            $http
                .get("/api/project/user?username=" + username)
                .success(function(user){
                    deferred.resolve(user);
                });

            return deferred.promise;
        }
    }
}) ();
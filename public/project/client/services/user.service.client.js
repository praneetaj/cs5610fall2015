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
            findAllCustomers : findAllCustomers,
            findUserById : findUserById,
            logout : logout,
            removeUser : removeUser,
            updateUser : updateUser,
            updatePassword : updatePassword
        };
        return api;

        function updatePassword (id, user) {
            var deferred = $q.defer();
            $http
                .put("/api/project/user/" + id + "/password", user)
                .success(function(users){
                    deferred.resolve(users);
                });

            return deferred.promise;
        }

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
            var user = {
                "loyalUUsername" : username,
                "password" : password
            };
            $http
                .post("/api/project/login", user)
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

        function logout () {
            var deferred = $q.defer();
            $http
                .post("/api/project/logout")
                .success(function(user){
                    deferred.resolve(user);
                });

            return deferred.promise;
        }

        function findUserById (id) {
            var deferred = $q.defer();
            $http
                .get("/api/project/user/" + id)
                .success(function(user){
                    deferred.resolve(user);
                });

            return deferred.promise;
        }

        function removeUser (id) {
            var deferred = $q.defer();
            $http
                .delete("/api/project/user/" + id)
                .success(function(user){
                    deferred.resolve(user);
                });

            return deferred.promise;
        }

        function updateUser (id, user) {
            var deferred = $q.defer();
            $http
                .put("/api/project/user/" + id, user)
                .success(function(user){
                    deferred.resolve(user);
                });

            return deferred.promise;
        }
    }
}) ();
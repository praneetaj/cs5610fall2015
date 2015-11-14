"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $q) {

        var api = {
            createUser : createUser,
            findAllUsers : findAllUsers,
            findUserByUsernameAndPassword : findUserByUsernameAndPassword,
            deleteUserById : deleteUserById,
            updateUser : updateUser
        };
        return api;

        function createUser (newUser) {
            var deferred = $q.defer();
            $http
                .post("/api/assignment/user", newUser)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findUserByUsernameAndPassword(username, password) {
            var deferred = $q.defer();
            $http.get("/api/assignment/user/username=" + username + "&password=" + password)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        /*
        function findUserByUsernameAndPassword (username, password) {
            var deferred = $q.defer();
            $http
                .get("/api/assignment/user/username="+username+"&password="+password)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }*/

        function findAllUsers () {
            var deferred = $q.defer();
            $http
                .get("/api/assignment/user")
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }



        function deleteUserById (id) {
            var deferred = $q.defer();
            $http
                .delete("/api/assignment/user/"+id)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function updateUser (id, user) {
            var deferred = $q.defer();
            $http
                .put("/api/assignment/user/"+id, user)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
}) ();
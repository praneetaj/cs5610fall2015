"use strict";
(function () {
    angular
        .module("LoyalUApp")
        .factory("UserService", UserService);

    function UserService ($http, $q) {

        var api = {
            findUserByUsernameAndPassword : findUserByUsernameAndPassword
        };
        return api;

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
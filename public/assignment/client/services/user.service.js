"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $q) {
        var users = [];

        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }

        var api = {
            createUser: createUser,
            findAllUsers: findAllUsers,
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return api;
        /*
        function findUserByUsernameAndPassword(currUserName, currPassword, callback) {
            for (var user in users) {
                if ((users[user].userName.localeCompare(currUserName) == 0) && (users[user].password.localeCompare(currPassword) == 0)) {
                    callback(users[user]);
                    return;
                }
            }
            callback(null);
        }*/

        function findUserByUsernameAndPassword(currUsername, currPassword) {
            var deferred = $q.defer();
            $http
                .get("/api/assignment/user/username="+currUsername+"&password="+currPassword)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findAllUsers(callback) {
            callback(users);
            return;
        }

        function createUser(newUser, callback) {
            var user = {
                id: guid(),
                userName: newUser.userName,
                password: newUser.password,
                email: newUser.email
            };
            users.push(user);
            callback(user);
        }

        function deleteUserById(id, callback) {

        }

        function updateUser(id, user) {
            var deferred = $q.defer();
            $http
                .put("/api/assignment/user/"+id, user)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
/*
        function updateUser(id, user, callback) {
            for (var index in users) {
                if (users[index].id == id) {
                    break;
                }
            }
            users.splice(index, 1);
            users.push(user);
            callback(user);
        }*/
    }
}) ();
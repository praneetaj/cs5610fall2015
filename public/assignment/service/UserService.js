"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {id: 1, userName: "praneeta", password: "praneeta", email: "praneeta@gmail.com"}
        ];

        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }

        var service = {
            createUser: createUser,
            findAllUsers: findAllUsers,
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return service;

        function findUserByUsernameAndPassword(currUserName, currPassword, callback) {
            for (var user in users) {
                if ((users[user].userName.localeCompare(currUserName) == 0) && (users[user].password.localeCompare(currPassword) == 0)) {
                    callback(users[user]);
                    return;
                }
            }
            callback(null);
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
            for (var index in users) {
                if (users[index].id == id) {
                    users.splice(index, 1);
                    callback(users);
                    return;
                }
            }
        }

        function updateUser(id, user, callback) {
            for (var index in users) {
                if (users[index].id == id) {
                    users[index].userName = user.userName;
                    users[index].password = user.password;
                    users[index].email = user.email;
                    users[index].firstName = user.firstName;
                    users[index].lastName = user.lastName;
                    callback(users[index]);
                    return;
                }
            }
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
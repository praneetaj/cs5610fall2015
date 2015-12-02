"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $rootScope, UserService) {

        var model = this;
        model.register = register;

        function register() {
            UserService.findUserByUsername(model.user.username).then(function (user) {
                console.log(model.user.username);
                console.log(user.length);
                console.log(user);
                if (user.length != 0) {
                    console.log("here");
                    alert("username already taken, choose another one!");
                } else {
                    var newuser = {
                        username : model.user.username,
                        password : model.user.password,
                        email : model.user.email,
                        firstName : "",
                        lastName : ""
                    };
                    UserService.createUser(newuser).then(initiateUserCreation);
                }
            });
        }

        function initiateUserCreation (user) {
            console.log (user);
            $rootScope.user = user;
            $location.url("/profile");
        }
    }
}) ();
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $rootScope, UserService) {

        var model = this;
        model.register = register;

        function register() {
            var newuser = {
                id : null,
                username : model.user.username,
                password : model.user.password,
                email : model.user.email,
                firstName : "",
                lastName : ""
            };
            UserService.createUser(newuser).then(initiateUserCreation);
        }

        function initiateUserCreation (response) {
            UserService.findUserByUsernameAndPassword(model.user.username, model.user.password).then(function (registeredUser) {
                $rootScope.user = registeredUser;
                $location.url("/profile");
            });
        }
    }
}) ();
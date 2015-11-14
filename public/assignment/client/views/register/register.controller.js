"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $rootScope, UserService) {

        var model = this;
        model.register = register;

        function register() {
            UserService.createUser(model.user).then(initiateUserCreation);
        }

        function initiateUserCreation (response) {
            UserService.findUserByUsernameAndPassword(model.user.username, model.user.password).then(function (registeredUser) {
                $rootScope.user = registeredUser;
                console.log($rootScope.user);
            });
            $location.url("/profile");
        }
    }
}) ();
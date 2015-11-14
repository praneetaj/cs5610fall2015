"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $location, UserService) {
        var model = this;
        model.login = login;

        UserService.findAllUsers().then(function (response) {
            console.log(response);
        });

        function login() {
            UserService.findUserByUsernameAndPassword(model.username, model.password).then(initiateLogin);

            function initiateLogin(response) {
                $rootScope.user = response;
                console.log(response);
                $location.url("/profile");
            }
        }
    }
}) ();
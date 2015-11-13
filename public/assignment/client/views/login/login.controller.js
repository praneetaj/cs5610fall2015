"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $location, UserService) {
        var model = this;
        model.login = login;

        function login(username, password) {
            UserService.findUserByUsernameAndPassword(username, password).then(initiateLogin);

            function initiateLogin(response) {
                $rootScope.user = response;
                $location.url("/profile");
            }
        }
    }
}) ();
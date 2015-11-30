"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $location, UserService) {
        var model = this;
        model.login = login;

        function login() {
            UserService.findUserByUsernameAndPassword(model.username, model.password).then(initiateLogin);

            function initiateLogin (response) {
                var users = response;
                if (users.length != 0) {
                    $rootScope.user = users[0];
                    $location.url("/profile");
                } else {
                    alert("Please enter valid username and password!");
                    model.username = "";
                    model.password = "";
                }
            }
        }
    }
}) ();
"use strict";
(function () {
    angular
        .module ("LoyalUApp")
        .controller ("LoginController", LoginController);

    function LoginController ($rootScope, $location, UserService) {
        console.log("LoginController");
        var model = this;
        model.login = login;

        function login() {
            UserService.findUserByUsernameAndPassword(model.username, model.password).then(initiateLogin);

            function initiateLogin (response) {
                $rootScope.loggedInUser = response;
                $location.url("/profile");
            }
        }
    }
}) ();
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
                console.log($rootScope.loggedInUser);
                console.log($rootScope.loggedInUser.role);

                if ($rootScope.loggedInUser.role == 'ADMIN') {
                    console.log("setting admin");
                    $rootScope.admin = true;
                } else if ($rootScope.loggedInUser.role == 'CUSTOMER') {
                    console.log("setting cust");
                    $rootScope.admin = false;
                }
                $location.url("/profile");
            }
        }
    }
}) ();
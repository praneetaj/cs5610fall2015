"use strict";
(function () {
    angular
        .module ("LoyalUApp")
        .controller ("LoginController", LoginController);

    function LoginController ($rootScope, $location, UserService) {
        console.log("LoginController");
        //console.log($rootScope.loggedInUser);
        var model = this;
        model.login = login;

        function login() {
            UserService.findUserByUsernameAndPassword(model.username, model.password).then(initiateLogin);

            function initiateLogin (response) {
                //console.log(response.statusCode);
                $rootScope.loggedInUser = response;
                //console.log($rootScope.loggedInUser);
                //console.log($rootScope.loggedInUser.role);

                $location.url("/profile");
            }
        }
    }
}) ();
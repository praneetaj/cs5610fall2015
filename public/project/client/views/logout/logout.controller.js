"use strict";
(function () {
    angular
        .module("LoyalUApp")
        .controller("LogoutController", LogoutController);

    function LogoutController ($rootScope, UserService) {
        var model = this;

        function logout()
        {
            UserService.logout().then(function () {
                $rootScope.loggedInUser = null;
            });
        }

        logout();
    }
})();
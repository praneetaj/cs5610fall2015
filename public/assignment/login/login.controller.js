"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, UserService) {
        $scope.user = $rootScope.user;
        $scope.login = login;

        function login() {
            var currUserName = $scope.user.userName;
            var currPassword = $scope.user.password;
            UserService.findUserByUsernameAndPassword(currUserName, currPassword, initiateLogin);

            function initiateLogin(currUser) {
                $rootScope.user = currUser;
            }
        }
    }

}) ();
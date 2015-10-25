"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, UserService) {

        $scope.login = login;

        function login() {
            var currUserName = $scope.userName;
            var currPassword = $scope.password;
            UserService.findUserByUsernameAndPassword(currUserName, currPassword, initiateLogin);

            function initiateLogin(currUser) {
                $rootScope.user = currUser;
                console.log($rootScope.user);
                console.log(currUser);
                $scope.$location.url("/profile");
            }
        }
    }

}) ();
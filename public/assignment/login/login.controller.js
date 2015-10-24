"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, UserService) {

        $scope.login = login;

        function login() {
            var currUserName = $scope.user.userName;
            var currPassword = $scope.user.password;
            UserService.findUserByUsernameAndPassword(currUserName, currPassword, initiate);

            function initiate(currUser) {
                $rootScope.user = currUser;
                console.log($rootScope.user);
            }
        }
    }

}) ();
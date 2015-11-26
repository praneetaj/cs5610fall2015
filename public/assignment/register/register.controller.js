"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, UserService) {

        $scope.register = register;

        function register() {
            UserService.createUser($scope.user, initiateUserCreation);
        }

        function initiateUserCreation(newUser) {
            $rootScope.user = newUser;
            console.log (newUser);
            $scope.$location.url("/profile");
        }
    }
}) ();
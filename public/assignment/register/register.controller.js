"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, UserService) {

        $scope.register = register;

        function register() {
            console.log($scope.user);
            UserService.createUser($scope.user, initiate);
        }

        function initiate(newUser) {
            $rootScope.user = newUser;
            console.log($rootScope.user);
        }
    }
}) ();
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, UserService) {

        $scope.user = $rootScope.user;

        $scope.update = update;
        function update() {
            var id = $rootScope.id;
            UserService.updateUser(id, $scope.user, initiateUpdate);
        }

        function initiateUpdate(updatedUser) {
            $scope.user = updatedUser;
            $rootScope.user = updatedUser;
            console.log($rootScope.user);
        }

    }
}) ();
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, UserService) {
        var model = this;
        model.user = $rootScope.user;
        console.log($rootScope.user);
        model.update = update;

        function update () {
            var updatedUser = model.user;
            console.log("updated user"+updatedUser);
            var id = updatedUser.id;
            UserService.updateUser(id, updatedUser).then(initiateUpdate);

            function initiateUpdate (response) {
                console.log(response);
            }
        }
    }
}) ();
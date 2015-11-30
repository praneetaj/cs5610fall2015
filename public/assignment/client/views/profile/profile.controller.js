"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, UserService) {
        var model = this;
        model.user = $rootScope.user;
        model.update = update;

        function update () {
            var updatedUser = model.user;
            $rootScope.user = model.user;
            var id = updatedUser._id;
            UserService.updateUser(id, updatedUser).then();
        }
    }
}) ();
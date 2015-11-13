"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, UserService) {
        var model = this;
        model.user = $rootScope.user;
        model.update = update;

        function update (user) {
            var id = user.id;
            UserService.updateUser(id, user).then(initiateUpdate);
            model.user = user;

            function initiateUpdate (response) {
                console.log(response);
            }
        }
    }
}) ();
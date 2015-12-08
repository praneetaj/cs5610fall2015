"use strict";
(function () {
    angular
        .module("LoyalUApp")
        .controller("ProfileController", ProfileController);

    function ProfileController ($rootScope, $location, UserService) {
        console.log("profile controller");
        var model = this;

        console.log($rootScope.loggedInUser);
        model.user = $rootScope.loggedInUser;

        model.updatePassword = updatePassword;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        function validUpdatePasswordInput () {
            if (typeof model.user == "undefined" ||
                typeof model.user.old == "undefined" ||
                typeof model.user.new == "undefined" ||
                typeof model.user.re == "undefined" ||
                model.user.old == "" ||
                model.user.new == "" ||
                model.user.re == "" ||
                model.user.new != model.user.re)
                    return false;
                else
                    return true;
        }

        function updateUser () {
            UserService.updateUser($rootScope.loggedInUser._id, model.user)
                .then (function (res) {
                    console.log(res);
                    $rootScope.loggedInUser = model.user;
            });
        }

        function deleteUser () {
            UserService.deleteUser($rootScope.loggedInUser._id)
                .then (function (res) {
                    console.log(res);
                    $rootScope.loggedInUser = null;
                    $location.url("/home");
                });
        }

        function updatePassword () {
            if (!validUpdatePasswordInput()) {
                alert("Enter valid inputs!");
                return;
            }
            UserService.updatePassword($rootScope.loggedInUser._id, model.user)
                .then(function (response) {
                    if (response == '0') {
                        alert("Something went wrong, try again!");
                    } else {
                        alert("Password updated successfully!");
                        $location.url("/profile");
                    }
                });
        }
    }
})();
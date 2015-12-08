"use strict";
(function () {
    angular
        .module("LoyalUApp")
        .controller("ProfileController", ProfileController);

    function ProfileController ($rootScope, UserService, $location) {
        console.log("profile controller");
        var model = this;

        model.updatePassword = updatePassword;

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
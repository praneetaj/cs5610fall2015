"use strict";
(function () {
    angular
        .module ("LoyalUApp")
        .controller ("HeaderController", HeaderController);

    function HeaderController ($scope, $location, $rootScope, UserService) {
        $scope.$location = $location;
        $scope.logout = logout;
        $scope.search = search;

        function search (zipcode) {
            $location.url("/search/" + zipcode);
        }

        function logout()
        {
            UserService.logout().then(function () {
                $rootScope.loggedInUser = null;
                $location.url("/home");
            });
        }
    }
})();
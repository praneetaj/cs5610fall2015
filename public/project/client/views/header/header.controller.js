"use strict";
(function () {
    angular
        .module ("LoyalUApp")
        .controller ("HeaderController", HeaderController);

    function HeaderController ($scope, $location, $rootScope, UserService) {
        $scope.$location = $location;
        $scope.logout = logout;
        $scope.search = search;
        $scope.searchKeyPress = searchKeyPress;

        function search (zipcode) {
            $scope.zipcode = "";
            $location.url("/search/" + zipcode);
        }

        function logout()
        {
            UserService.logout().then(function () {
                $rootScope.loggedInUser = null;
                $location.url("/home");
            });
        }

        function searchKeyPress(e)
        {
            // look for window.event in case event isn't passed in
            e = e || window.event;
            if (e.keyCode == 13)
            {
                search($scope.zipcode);
            }
        }
    }
})();
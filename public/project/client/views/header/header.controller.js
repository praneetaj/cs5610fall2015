(function () {
    angular
        .module ("LoyalUApp")
        .controller ("HeaderController", HeaderController);

    function HeaderController ($scope, $location, $rootScope, UserService) {
        $scope.$location = $location;
        $scope.logout = function()
        {
            UserService.logout().then(function () {
                $rootScope.loggedInUser = null;
                $location.url("/home");
            });
            /*
            $http.post("/logout")
                .success(function()
                {
                    $rootScope.currentUser = null;
                    $location.url("/home");
                }); */
        }
    }
})();
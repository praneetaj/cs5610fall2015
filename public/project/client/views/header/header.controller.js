(function () {
    angular
        .module ("LoyalUApp")
        .controller ("HeaderController", HeaderController);

    function HeaderController ($scope, $location) {
        $scope.$location = $location;
    }
})();
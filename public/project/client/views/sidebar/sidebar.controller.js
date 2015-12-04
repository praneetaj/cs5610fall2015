"use strict";
(function () {
    angular
        .module("LoyalUApp")
        .controller("SidebarController",SidebarController);

    function SidebarController ($scope, $location) {
        $scope.$location = $location;
    }
})();
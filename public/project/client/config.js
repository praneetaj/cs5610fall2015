"use strict";
(function () {
    angular
        .module("LoyalUApp")
        .config(Configure);

    function Configure ($routeProvider) {
        $routeProvider
            .when ("/home", {
                templateUrl : "views/home/home.view.html"
            })
            .otherwise({
                redirectTo : "/home "
            });
    }
} )();
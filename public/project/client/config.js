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
            .when ("/search-coupons", {
                templateUrl : "views/search-coupons/search-coupons.view.html",
                controller : "SearchCouponsController",
                controllerAs : "model"
            })
            .when ("/register", {
                templateUrl : "views/register/register-user.view.html",
                controller : "RegisterController",
                controllerAs : "model"
            })
            .when ("/register-restaurant", {
                templateUrl : "views/register/register-restaurant.view.html",
                controller : "RegisterController",
                controllerAs : "model"
            })
            .when ("/login", {
                templateUrl : "views/login/login.view.html",
                controller : "LoginController",
                controllerAs : "model"
            })
            .otherwise({
                redirectTo : "/home"
            });
    }
} )();
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
            .when ("/searchWebCoupons", {
                templateUrl : "views/searchWebCoupons/searchWebCoupons.view.html",
                controller : "SearchWebCouponsController",
                controllerAs : "model"
            })
            .when ("/searchLoyalUCoupons", {
                templateUrl : "views/searchLoyalUCoupons/searchLoyalUCoupons.view.html",
                controller : "SearchLoyalUCouponsController",
                controllerAs : "model"
            })
            .when ("/details/:dealId", {
                templateUrl : "views/searchWebCoupons/searchWebCoupons.details.view.html",
                controller : "SearchWebCouponsDetailsController",
                controllerAs : "model"
            })
            .when ("/restaurantCoupons", {
                templateUrl : "views/restaurantCoupons/restaurantQuantityCoupons.view.html",
                controller : "RestaurantQuantityCouponsController",
                controllerAs : "model"
            })
            .when ("/restaurantAmountCoupons", {
                templateUrl : "views/restaurantCoupons/restaurantAmountCoupons.view.html",
                controller : "RestaurantAmountCouponsController",
                controllerAs : "model"
            })
            .when ("/register", {
                //templateUrl : "views/register/register-user.view.html",
                templateUrl : "views/register/register.view.html",
                controller : "RegisterController",
                controllerAs : "model"
            })
            /*
            .when ("/register-restaurant", {
                //templateUrl : "views/register/register-restaurant.view.html",
                templateUrl : "views/register/register.view.html",
                controller : "RegisterController",
                controllerAs : "model"
            })
            */
            .when ("/createCoupons", {
                templateUrl : "views/restaurantCoupons/createCoupon.view.html",
                controller : "CreateCouponController",
                controllerAs : "model"
            })
            .when ("/recordTransaction", {
                templateUrl : "views/recordTransaction/recordTransaction.view.html",
                controller : "RecordTransactionController",
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
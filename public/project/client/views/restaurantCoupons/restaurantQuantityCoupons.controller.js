"use strict";
(function () {
    angular
        .module("LoyalUApp")
        .controller("RestaurantQuantityCouponsController", RestaurantQuantityCouponsController);

    function RestaurantQuantityCouponsController ($scope, $rootScope, LoyalUCouponService) {

        var model = this;

        function init () {
            if ($rootScope.loggedInUser) {
                LoyalUCouponService.getRestCouponsByLocuId ($rootScope.loggedInUser.restLocuId).then(function (response) {
                    model.restaurantCoupons = response;
                })
            }
        }

        init();
    }
}) ();
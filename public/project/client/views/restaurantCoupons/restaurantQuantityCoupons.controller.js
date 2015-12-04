"use strict";
(function () {
    angular
        .module("LoyalUApp")
        .controller("RestaurantQuantityCouponsController", RestaurantQuantityCouponsController);

    function RestaurantQuantityCouponsController ($scope, $rootScope, LoyalUCouponService, LocuApiService) {

        var model = this;

        function init () {
            if ($rootScope.loggedInUser) {
                LoyalUCouponService.getRestCouponsByLocuId ($rootScope.loggedInUser.restLocuId).then(function (response) {
                    model.restaurantCoupons = response;
                });
                LocuApiService.getMenuByLocuId ($rootScope.loggedInUser.restLocuId).then(function (response) {
                    var menuItems = LocuApiService.extractMenuFromResponse (response);
                    console.log(menuItems);
                    model.menuItems = menuItems;
                    //console.log(response.body.venues[0].menus[0].sections[0].subsections);
                });
            }
        }

        init();
    }
}) ();
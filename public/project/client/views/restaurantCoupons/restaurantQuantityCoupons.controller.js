"use strict";
(function () {
    angular
        .module("LoyalUApp")
        .controller("RestaurantQuantityCouponsController", RestaurantQuantityCouponsController);

    function RestaurantQuantityCouponsController ($scope, $rootScope, LoyalUCouponService,
                                                  LocuApiService, customerCouponService) {

        var model = this;
        model.removeCoupon = removeCoupon;
        model.selectCoupon = selectCoupon;
        model.updateCoupon = updateCoupon;

        function initCoupons () {
            if ($rootScope.loggedInUser) {
                LoyalUCouponService.getRestByLocuId ($rootScope.loggedInUser.restLocuId).then(function (response) {
                    console.log(response);
                    model.restaurantCoupons = response;
                });
            }
        }

        function initMenu () {
            if ($rootScope.loggedInUser) {
                LocuApiService.getLocuDetailsByLocuId ($rootScope.loggedInUser.restLocuId).then(function (response) {
                    var menuItems = LocuApiService.extractMenuFromResponse (response);
                    console.log(menuItems);
                    model.menuItems = menuItems;
                    model.response = response;
                });
            }
        }

        initCoupons();

        function removeCoupon (index) {
            LoyalUCouponService.removeCouponByLocuIdAndCouponIndex ($rootScope.loggedInUser.restLocuId, index).then(function (response) {
                initCoupons();
                customerCouponService.deleteCustCouponsByCouponId (model.restaurantCoupons.coupons[index]._id)
                    .then (function (response) {
                });
            });
        }

        function selectCoupon (index) {
            model.updateCouponFields = true;
            initMenu();
            LoyalUCouponService.getCouponByLocuIdAndCouponIndex ($rootScope.loggedInUser.restLocuId, index).then(function (response) {
                model.newCoupon = response;
                model.selectedIndex = index;
                console.log(model.newCoupon);
            });
        }

        function updateCoupon () {
            LoyalUCouponService.updateCouponByLocuIdAndCouponIndex ($rootScope.loggedInUser.restLocuId, model.selectedIndex, model.newCoupon).then(function (response) {
                initCoupons();
                model.updateCouponFields = false;
            });
        }
    }
}) ();
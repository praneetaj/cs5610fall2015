"use strict";
(function () {
    angular
        .module("LoyalUApp")
        .controller("RestaurantAmountCouponsController", RestaurantAmountCouponsController);

    function RestaurantAmountCouponsController ($scope, $rootScope,
                                                LoyalUCouponService, LocuApiService,
                                                customerCouponService) {

        var model = this;
        model.removeCoupon = removeCoupon;
        model.selectCoupon = selectCoupon;
        model.updateCoupon = updateCoupon;

        function initCoupons () {
            if ($rootScope.loggedInUser) {
                LoyalUCouponService.getRestByLocuId ($rootScope.loggedInUser.restLocuId).then(function (response) {
                    model.restaurantCoupons = response;
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
            model.updateFields = true;
            LoyalUCouponService.getCouponByLocuIdAndCouponIndex ($rootScope.loggedInUser.restLocuId, index).then(function (response) {
                model.newCoupon = response;
                model.selectedIndex = index;
            });
        }

        function updateCoupon () {
            LoyalUCouponService.updateCouponByLocuIdAndCouponIndex ($rootScope.loggedInUser.restLocuId, model.selectedIndex, model.newCoupon).then(function (response) {
                initCoupons();
                model.updateFields = false;
            });
        }
    }
}) ();
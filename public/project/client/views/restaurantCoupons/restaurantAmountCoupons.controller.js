"use strict";
(function () {
    angular
        .module("LoyalUApp")
        .controller("RestaurantAmountCouponsController", RestaurantAmountCouponsController);

    function RestaurantAmountCouponsController ($scope, $rootScope, LoyalUCouponService, LocuApiService) {

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

        function initMenu () {
            if ($rootScope.loggedInUser) {
                LocuApiService.getMenuByLocuId ($rootScope.loggedInUser.restLocuId).then(function (response) {
                    var menuItems = LocuApiService.extractMenuFromResponse (response);
                    console.log(menuItems);
                    model.menuItems = menuItems;
                    model.response = response;
                });
            }
        }

        initCoupons();
        initMenu();

        function addCoupon () {
            var newCoupon = {
                label : model.newCoupon.label,
                couponType : "QUANTITY",
                description : model.newCoupon.description,
                itemName : model.newCoupon.itemName,
                quantity : model.newCoupon.quantity,
                amount : null,
                dateCreated : new Date(),
                expiry : model.newCoupon.expiry
            };
            LoyalUCouponService.addCouponForRest($rootScope.loggenodenUser.restLocuId, newCoupon).then(function (response) {
                initCoupons();
                model.newCoupon.label = "";
                model.newCoupon.description = "";
                model.newCoupon.itemName = "";
                model.newCoupon.quantity = "";
                model.newCoupon.expiry = "";
                model.menuItems = LocuApiService.extractMenuFromResponse (model.response);
            });
        }

        function removeCoupon (index) {
            LoyalUCouponService.removeCouponByLocuIdAndCouponIndex ($rootScope.loggedInUser.restLocuId, index).then(function (response) {
                initCoupons();
            });
        }

        function selectCoupon (index) {
            LoyalUCouponService.getCouponByLocuIdAndCouponIndex ($rootScope.loggedInUser.restLocuId, index).then(function (response) {
                model.newCoupon = response;
                model.selectedIndex = index;
            });
        }

        function updateCoupon () {
            LoyalUCouponService.updateCouponByLocuIdAndCouponIndex ($rootScope.loggedInUser.restLocuId, model.selectedIndex, model.newCoupon).then(function (response) {
                initCoupons();
            });
        }
    }
}) ();
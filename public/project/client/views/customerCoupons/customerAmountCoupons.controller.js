"use strict";
(function () {
    angular
        .module("LoyalUApp")
        .controller("CustomerAmountCouponsController", CustomerAmountCouponsController);

    function CustomerAmountCouponsController (customerCouponService, RestaurantService, $rootScope) {
        var model = this;

        function init () {
            customerCouponService
                .getAllCustCouponsByCustId ($rootScope.loggedInUser._id)
                .then (function (custCoupons) {
                RestaurantService
                    .getAllRestaurantsAndCoupons()
                    .then (function (restaurants) {
                    model.coupons = customerCouponService.joinCoupons (custCoupons.data, restaurants.data);
                });
            });
        }
        init();
    }
})();
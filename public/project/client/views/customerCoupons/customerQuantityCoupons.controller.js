"use strict";
(function () {
    angular
        .module("LoyalUApp")
        .controller("CustomerQuantityCouponsController", CustomerQuantityCouponsController);

    function CustomerQuantityCouponsController (customerCouponService, RestaurantService, $rootScope) {
        var model = this;

        function init () {
            customerCouponService
                .getAllCustCouponsByCustId ($rootScope.loggedInUser._id)
                .then (function (custCoupons) {
                    RestaurantService
                        .getAllRestaurantsAndCoupons()
                        .then (function (restaurants) {
                            model.coupons = joinCoupons (custCoupons.data, restaurants.data);
                    });
            });
        }
        init();

        function joinCoupons (custCoupons, restaurants) {
            var result = [];
            for (var i = 0; i < custCoupons.length; i++) {
                for (var j = 0; j < restaurants.length; j++) {
                    if (custCoupons[i].restLocuId == restaurants[j].restLocuId) {
                        for (var k = 0; k < restaurants[j].coupons.length; k++) {
                            if (custCoupons[i].couponId == restaurants[j].coupons[k]._id) {
                                var details = {
                                    customerId : custCoupons[i].customerId,
                                    restLocuId : custCoupons[i].restLocuId,
                                    restName : restaurants[j].name,
                                    couponId : custCoupons[i].couponId,
                                    couponType : restaurants[j].coupons[k].couponType,
                                    couponLabel : restaurants[j].coupons[k].label,
                                    description : restaurants[j].coupons[k].description,
                                    itemName : restaurants[j].coupons[k].itemName,
                                    userCurrQuantity : custCoupons[i].currQuantity,
                                    userTotalQuantity : custCoupons[i].totalQuantity,
                                    restQuantity : restaurants[j].coupons[k].quantity,
                                    expiry : restaurants[j].coupons[k].expiry,
                                    userAmount : custCoupons[i].amount,
                                    restAmount : restaurants[j].coupons[k].amount,
                                    restDiscount : restaurants[j].coupons[k].discount
                                };
                                result.push(details);
                                break;
                            }
                        }
                        break;
                    }
                }
            }
            return result;
        }
    }
})();
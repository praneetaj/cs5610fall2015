"use strict";
(function (){
    angular
        .module("LoyalUApp")
        .factory("customerCouponService", customerCouponService);

    function customerCouponService ($http, $q) {
        var api = {
            createCustomerCouponEntryById : createCustomerCouponEntryById,
            createOrUpdateCustCouponByCustId : createOrUpdateCustCouponByCustId,
            getAllCustCouponsByCustId : getAllCustCouponsByCustId,
            deleteCustCouponsByCouponId : deleteCustCouponsByCouponId,
            getCustCouponsByCouponId : getCustCouponsByCouponId,
            joinCoupons : joinCoupons
        };
        return api;

        function createCustomerCouponEntryById (customerId, customerCouponEntry) {
            var deferred = $q.defer();
            $http
                .post("/api/project/customer/" + customerId + "/coupon", customerCouponEntry)
                .then(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function createOrUpdateCustCouponByCustId (custId, customerCoupon) {
            console.log("about to send record request");
            var deferred = $q.defer();
            $http
                .put("/api/project/customer/" + custId + "/coupon", customerCoupon)
                .then(function(response){
                    console.log("returning from recording transaction");
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function getAllCustCouponsByCustId (customerId) {
            var deferred = $q.defer();
            $http
                .get("/api/project/customer/" + customerId + "/coupon")
                .then(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function deleteCustCouponsByCouponId (couponId) {
            var deferred = $q.defer();
            $http
                .delete("/api/project/customer/coupon/" + couponId)
                .then(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function getCustCouponsByCouponId (couponId) {
            var deferred = $q.defer();
            $http
                .get("/api/project/customer/coupon/" + couponId)
                .then(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

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
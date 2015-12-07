"use strict";
(function (){
    angular
        .module("LoyalUApp")
        .factory("customerCouponService", customerCouponService);

    function customerCouponService ($http, $q) {
        var api = {
            //createCustomerCouponEntryById : createCustomerCouponEntryById,
            createOrUpdateCustCouponByCustId : createOrUpdateCustCouponByCustId,
            getAllCustCouponsByCustId : getAllCustCouponsByCustId
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
    }
})();
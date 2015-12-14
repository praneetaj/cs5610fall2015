(function () {
    angular
        .module ("LoyalUApp")
        .factory ("LoyalUCouponService", LoyalUCouponService);

    function LoyalUCouponService ($http, $q) {

        var api = {
            //getAllCoupons : getAllCoupons,
            getRestCouponsByZipcodeOrCity : getRestCouponsByZipcodeOrCity,
            getRestByLocuId : getRestByLocuId,
            addCouponForRest : addCouponForRest,
            removeCouponByLocuIdAndCouponIndex : removeCouponByLocuIdAndCouponIndex,
            getCouponByLocuIdAndCouponIndex : getCouponByLocuIdAndCouponIndex,
            updateCouponByLocuIdAndCouponIndex : updateCouponByLocuIdAndCouponIndex,
            getAllCouponsByLocuId : getAllCouponsByLocuId,
            joinAggregateAndCoupons : joinAggregateAndCoupons
        };
        return api;

        function getRestCouponsByZipcodeOrCity (searchParam) {
            console.log(searchParam);
            var deferred = $q.defer();
            $http
                .get("/api/project/restaurant?search=" + searchParam)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function getRestByLocuId (locuId) {
            var deferred = $q.defer();
            $http
                .get("/api/project/restaurant?locuId=" + locuId)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function addCouponForRest (locuId, newCoupon) {
            console.log(locuId);
            console.log(newCoupon);
            var deferred = $q.defer();
            $http
                .put("/api/project/restaurant/" + locuId, newCoupon)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function removeCouponByLocuIdAndCouponIndex (locuId, index) {
            var deferred = $q.defer();
            $http
                .delete("/api/project/restaurant/" + locuId + "/coupon/" + index)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function getCouponByLocuIdAndCouponIndex (locuId, index) {
            var deferred = $q.defer();
            $http
                .get("/api/project/restaurant/" + locuId + "/coupon/" + index)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function updateCouponByLocuIdAndCouponIndex (locuId, index, updatedCoupon) {
            var deferred = $q.defer();
            $http
                .put("/api/project/restaurant/" + locuId + "/coupon/" + index, updatedCoupon)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function getAllCouponsByLocuId (locuId, expired) {
            var deferred = $q.defer();
            $http
                .get("/api/project/restaurant/" + locuId + "/coupon?expired=" + expired)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function joinAggregateAndCoupons (agg, rest) {
            var result = [];
            for (var i = 0; i < agg.length; i++) {
                for (var j = 0; j < rest.coupons.length; j++) {
                    if (agg[i]._id == rest.coupons[j]._id) {
                        var jj = [];
                        var t1 = {
                            v : rest.coupons[j].label
                        };
                        var t2 = {
                            v : agg[i].totalRedeem
                        };
                        jj.push (t1);
                        jj.push(t2);
                        var temp = {
                            c : jj
                        };
                        result.push(temp);
                        break;
                    }
                }
            }
            return result;
        }
    }
})();
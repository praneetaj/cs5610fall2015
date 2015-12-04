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
            updateCouponByLocuIdAndCouponIndex : updateCouponByLocuIdAndCouponIndex
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

        /*
        function getAllCoupons () {
            var deferred = $q.defer();
            var searchUrl = zipcodeUrl.replace("ZIPCODE", zipcode);
            $http
                .jsonp(searchUrl)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }*/
    }
})();
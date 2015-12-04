(function () {
    angular
        .module ("LoyalUApp")
        .factory ("LoyalUCouponService", LoyalUCouponService);

    function LoyalUCouponService ($http, $q) {

        var api = {
            //getAllCoupons : getAllCoupons,
            getRestCouponsByZipcodeOrCity : getRestCouponsByZipcodeOrCity
        };
        return api;

        function getRestCouponsByZipcodeOrCity (searchParam) {
            var deferred = $q.defer();
            $http
                .get("/api/project/restcoupon/" + searchParam)
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
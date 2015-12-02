(function () {
    angular
        .module ("LoyalUApp")
        .factory ("ExternalCouponService", ExternalCouponService);

    function ExternalCouponService ($http, $q) {
        var url = "http://api.8coupons.com/v1/getdeals?key=c32014351d1392596f303311bbdfe13c94d66c177e09fa6cc49c0ae3fb8bdebe1c389dc928b7a82c3835764f855bd55b&zip=ZIPCODE&mileradius=20&orderby=radius&categoryid=1&format=JSONP&callback=JSON_CALLBACK";

        var api = {
            searchCouponsByZipcode : searchCouponsByZipcode
        };
        return api;

        function searchCouponsByZipcode (zipcode) {
            var deferred = $q.defer();
            var searchUrl = url.replace("ZIPCODE", zipcode);
            $http
                .jsonp(searchUrl)
                .success(function(response) {
                    console.log("response received");
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();
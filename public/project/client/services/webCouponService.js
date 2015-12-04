(function () {
    angular
        .module ("LoyalUApp")
        .factory ("WebCouponService", WebCouponService);

    function WebCouponService ($http, $q) {
        //var api8CouponsCredentials = require("./8coupons.js");

        var zipcodeUrl = "http://api.8coupons.com/v1/getdeals?key=c32014351d1392596f303311bbdfe13c94d66c177e09fa6cc49c0ae3fb8bdebe1c389dc928b7a82c3835764f855bd55b&zip=ZIPCODE&mileradius=20&orderby=radius&categoryid=1&format=JSONP&callback=JSON_CALLBACK";
        var detailsUrl = "http://api.8coupons.com/v1/getdealbyid?key=c32014351d1392596f303311bbdfe13c94d66c177e09fa6cc49c0ae3fb8bdebe1c389dc928b7a82c3835764f855bd55b&dealID=DEALID&format=JSONP&callback=JSON_CALLBACK";

        var api = {
            searchCouponsByZipcode : searchCouponsByZipcode,
            getDealDetailsById : getDealDetailsById
        };
        return api;

        function searchCouponsByZipcode (zipcode) {
            var deferred = $q.defer();
            var searchUrl = zipcodeUrl.replace("ZIPCODE", zipcode);
            $http
                .jsonp(searchUrl)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function getDealDetailsById (dealId) {
            var deferred = $q.defer();
            var searchUrl = detailsUrl.replace("DEALID", dealId);
            $http
                .jsonp(searchUrl)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();
"use strict";
(function () {
    angular
        .module ("LoyalUApp")
        .controller ("SearchController", SearchController);

    function SearchController ($routeParams, LoyalUCouponService, WebCouponService) {
        var model = this;
        var zipcode = $routeParams.zipcode;
        console.log(zipcode);

        function init () {
            LoyalUCouponService.getRestCouponsByZipcodeOrCity(zipcode).then(function (response) {
                model.coupons = response;
                console.log(response);
            });
            WebCouponService.searchCouponsByZipcode (zipcode).then(function(webCoupons){
                model.webCoupons = webCoupons;
                console.log(webCoupons);
            });
        }

        init ();

    }
})();
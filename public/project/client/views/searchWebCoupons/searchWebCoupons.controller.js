(function () {
    angular
        .module ("LoyalUApp")
        .controller ("SearchWebCouponsController", SearchWebCouponsController);

    function SearchWebCouponsController (WebCouponService, $http) {
        var model = this;
        model.search = search;

        function search () {
            WebCouponService.searchCouponsByZipcode (model.zipcode).then(function(coupons){
                model.coupons = coupons;
            });
        }
    }
}) ();
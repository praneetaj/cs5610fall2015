(function () {
    angular
        .module ("LoyalUApp")
        .controller ("SearchCouponsController", SearchCouponsController);

    function SearchCouponsController (ExternalCouponService) {
        var model = this;
        model.search = search;

        function search () {
            ExternalCouponService.searchCouponsByZipcode (model.zipcode).then(function(coupons){
                model.coupons = coupons;
            });
        }
    }
}) ();
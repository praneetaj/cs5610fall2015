(function () {
    angular
        .module ("LoyalUApp")
        .controller ("SearchCouponsController", SearchCouponsController);

    function SearchCouponsController (ExternalCouponService, $http) {
        var model = this;
        model.search = search;
        model.search2 = search2;

        function search () {
            ExternalCouponService.searchCouponsByZipcode (model.zipcode).then(function(coupons){
                model.coupons = coupons;
            });
        }

        function search2 () {

            ExternalCouponService.searchFromLocu().then(function (response) {
                console.log(response);
            });
        }
    }
}) ();
(function () {
    angular
        .module ("LoyalUApp")
        .controller ("SearchWebCouponsController", SearchWebCouponsController);

    function SearchWebCouponsController (WebCouponService, $http) {
        var model = this;
        model.search = search;
        model.search2 = search2;

        function search () {
            WebCouponService.searchCouponsByZipcode (model.zipcode).then(function(coupons){
                model.coupons = coupons;
            });
        }

        function search2 () {

            WebCouponService.searchFromLocu().then(function (response) {
                console.log(response);
            });
        }
    }
}) ();
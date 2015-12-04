(function () {
    angular
        .module ("LoyalUApp")
        .controller ("SearchLoyalUCouponsController", SearchLoyalUCouponsController);

    function SearchLoyalUCouponsController (LoyalUCouponService) {
        var model = this;
        model.search = search;

        function search () {
            LoyalUCouponService.getRestCouponsByZipcodeOrCity(model.inputSearch).then(function (response) {
                console.log(response);
                model.restaurants = response;
            });
        }
    }
}) ();
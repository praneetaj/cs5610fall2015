(function () {
    angular
        .module ("LoyalUApp")
        .controller ("ExternalCouponsDetailsController", ExternalCouponsDetailsController);

    function ExternalCouponsDetailsController (ExternalCouponService, $routeParams) {
        var model = this;
        var dealId = $routeParams.dealId;
        function init () {
            ExternalCouponService.getDealDetailsById(dealId).then(function (coupon) {
                model.coupon = coupon[0];
                model.imageUrl = model.coupon.URL;
                console.log(model.coupon);
            });
        }
        init();
    }
}) ();
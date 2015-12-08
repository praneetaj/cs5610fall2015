(function () {
    angular
        .module ("LoyalUApp")
        .controller ("SearchWebCouponsDetailsController", SearchWebCouponsDetailsController);

    function SearchWebCouponsDetailsController (WebCouponService, $routeParams) {
        var model = this;
        var dealId = $routeParams.dealId;
        var storeId = $routeParams.storeId;
        function init () {
            WebCouponService.getDealDetailsById(dealId).then(function (coupon) {
                model.coupon = coupon[0];
                model.imageUrl = model.coupon.URL;
                console.log(model.coupon);
            });
        }
        init();
    }
}) ();
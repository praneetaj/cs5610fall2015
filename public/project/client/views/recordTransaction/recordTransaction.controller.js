"use strict";
(function () {
    angular
        .module("LoyalUApp")
        .controller("RecordTransactionController", RecordTransactionController);

    function RecordTransactionController (UserService, LoyalUCouponService, $rootScope) {
        var model = this;
        model.couponChange = couponChange;

        function loadAllCustomers() {
            console.log("loading customers");
            UserService.findAllCustomers().then(function (response) {
                model.users = response;
                console.log(response);
            });
        }

        function loadAllCoupons () {
            if ($rootScope.loggedInUser) {
                LoyalUCouponService.getRestByLocuId($rootScope.loggedInUser.restLocuId).then(function (response) {
                    model.restaurant = response;
                    console.log(response);
                });
            }
        }

        loadAllCustomers();
        loadAllCoupons();

        function couponChange () {
            model.couponTypeLoad = true;
            var index = model.selectedCoupon;
            if (model.restaurant.coupons[index].couponType == "AMOUNT") {
                model.amountType = true;
            } else {
                model.amountType = false;
            }
        }
    }
})();
"use strict";
(function () {
    angular
        .module("LoyalUApp")
        .controller("RecordTransactionController", RecordTransactionController);

    function RecordTransactionController (UserService, LoyalUCouponService, customerCouponService, $rootScope) {
        var model = this;
        model.couponChange = couponChange;
        model.record = record;

        function loadAllCustomers() {
            console.log($rootScope.loggedInUser);
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

        function record () {
            console.log(model.users[model.selectedUser]._id);
            var index = model.selectedCoupon;
            var currQuantity, totalQuantity, amount;
            if (model.restaurant.coupons[index].couponType == "AMOUNT") {
                currQuantity = 0;
                amount = model.amount;
            } else {
                currQuantity = model.quantity;
                amount = 0;
            }
            var customerCoupon = {
                customerId : model.users[model.selectedUser]._id,
                restLocuId : $rootScope.loggedInUser.restLocuId,
                couponId : model.restaurant.coupons[index]._id,
                couponLabel : model.restaurant.coupons[index].label,
                currQuantity : currQuantity,
                amount : amount
            };
            customerCouponService
                .createOrUpdateCustCouponByCustId(model.users[model.selectedUser]._id, customerCoupon)
                .then(function(response){
                    console.log(response);
            });
        }
    }
})();
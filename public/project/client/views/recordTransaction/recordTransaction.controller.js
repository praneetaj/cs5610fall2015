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

        function loadAllUnexpiredCoupons () {
            if ($rootScope.loggedInUser) {
                LoyalUCouponService.getAllCouponsByLocuId ($rootScope.loggedInUser.restLocuId, 0)
                    .then (function (res) {
                        model.coupons = res;
                });
            }
        }

        loadAllCustomers();
        loadAllUnexpiredCoupons();

        function couponChange () {
            model.couponTypeLoad = true;
            var index = model.selectedCoupon;
            if (model.coupons[index].couponType == "AMOUNT") {
                model.amountType = true;
            } else {
                model.amountType = false;
            }
        }

        function record () {
            console.log(model.users[model.selectedUser]._id);
            var index = model.selectedCoupon;
            var currQuantity, totalQuantity, amount, couponType;
            if (model.coupons[index].couponType == "AMOUNT") {
                currQuantity = null;
                amount = model.amount;
            } else {
                currQuantity = model.quantity;
                amount = null;
            }
            var customerCoupon = {
                customerId : model.users[model.selectedUser]._id,
                restLocuId : $rootScope.loggedInUser.restLocuId,
                couponId : model.coupons[index]._id,
                currQuantity : currQuantity,
                amount : amount,
                restCoupon : model.coupons[index]
            };
            console.log(customerCoupon);
            customerCouponService
                .createOrUpdateCustCouponByCustId(model.users[model.selectedUser]._id, customerCoupon)
                .then(function(response){
                    console.log(response);
                    $('#myModal').modal();
                    displayDiscount (response);
            });
        }

        function displayDiscount (response) {
            model.displayDiscount = true;
            model.displayResult = response.data;
        }
    }
})();
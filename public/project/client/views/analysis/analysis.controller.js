"use strict";
(function () {
    angular
        .module ("LoyalUApp")
        .controller ("AnalysisController", AnalysisController);

    function AnalysisController ($rootScope, $scope, LoyalUCouponService, customerCouponService) {
        console.log("AnalysisController");

        var model = this;

        $scope.chartObject = {};
        $scope.chartObject.type = "PieChart";
        $scope.chartObject.options = {
            'title': 'Redemption count split by Coupons'
        };

        function init () {
            customerCouponService.getAggregatedRedeemCountByLocuId($rootScope.loggedInUser.restLocuId)
                .then (function (res) {
                    LoyalUCouponService.getRestByLocuId ($rootScope.loggedInUser.restLocuId)
                        .then (function (resp) {
                            var join = LoyalUCouponService.joinAggregateAndCoupons (res.data, resp);
                            console.log(join);
                        $scope.chartObject.data = {"cols": [
                            {id: "t", label: "CouponLabel", type: "string"},
                            {id: "s", label: "redeemCount", type: "number"}
                        ], "rows" : join};
                    });
                });
        }

        init();

    }
}) ();
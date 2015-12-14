"use strict";
(function () {
    angular
        .module("LoyalUApp")
        .controller("HomeController", HomeController);

    function HomeController (RestaurantService) {
        var model = this;

        function init () {
            RestaurantService.getAllRestaurantsAndCoupons().then(function (response) {
                console.log(response.data.length);
                var result = [];
                var cnt = 0;
                for (var i = 0; i < response.data.length; i++) {
                    if (response.data[i].coupons.length > 0) {
                        result.push(response.data[i]);
                        cnt++;
                        if (cnt == 6)
                            break;
                    }
                }

                model.coupons = result;
            });
        }

        init();
    }
})();
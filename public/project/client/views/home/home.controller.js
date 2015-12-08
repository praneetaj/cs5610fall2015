"use strict";
(function () {
    angular
        .module("LoyalUApp")
        .controller("HomeController", HomeController);

    function HomeController (RestaurantService) {
        var model = this;

        function objectifyCoupons (restaurants) {
            var result = [];
            var count = 0;
            for (var i = 0; i < restaurants.length; i++) {
                var obj = {
                    restLocuId : restaurants[i].restLocuId,
                    couponId : restaurants[i].coupons[0]._id,
                    name : restaurants[i].name,
                    zipcode : restaurants[i].zipcode,
                    city : restaurants[i].city,
                    imageUrl : restaurants[i].image_url,
                    label : restaurants[i].coupons[0].label,
                    couponType : restaurants[i].coupons[0].couponType,
                    description : restaurants[i].coupons[0].description,
                    itemName : restaurants[i].coupons[0].itemName,
                    quantity : restaurants[i].coupons[0].quantity,
                    amount : restaurants[i].coupons[0].amount,
                    discount : restaurants[i].coupons[0].discount,
                    expiry : restaurants[i].coupons[0].expiry
                };
                count++;
                result.push(obj);
                if (count == 6)
                    break;
            }
            return result;
        }

        function init () {
            RestaurantService.getAllRestaurantsAndCoupons().then(function (response) {
                console.log(response.data.length);
                model.coupons = response.data;
            });
        }

        init();
    }
})();
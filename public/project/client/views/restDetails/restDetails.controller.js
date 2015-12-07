"use strict";
(function () {
    angular
        .module ("LoyalUApp")
        .controller ("RestDetailsController", RestDetailsController);

    function RestDetailsController ($routeParams, RestaurantService, LocuApiService) {
        var model = this;
        var restLocuId = $routeParams.restLocuId;
        RestaurantService.getRestaurantByLocuId(restLocuId)
            .then (function (response) {
            model.restaurant = response.data;
        });
        LocuApiService.getLocuDetailsByLocuId(restLocuId)
            .then (function (rest) {
            model.locuRest = rest.body.venues[0];
            console.log(model.locuRest.website_url);
            console.log(rest.body.venues[0]);
        });
    }
})();
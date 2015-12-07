"use strict";
(function () {
    angular
        .module ("LoyalUApp")
        .controller ("RestDetailsController", RestDetailsController);

    function RestDetailsController ($routeParams, RestaurantService) {
        var model = this;
        var restLocuId = $routeParams.restLocuId;
        RestaurantService.getRestaurantByLocuId(restLocuId)
            .then (function (response) {
            model.restaurant = response.data;
        });
    }
})();
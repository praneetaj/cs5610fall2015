"use strict";
(function () {
    angular
        .module("LoyalUApp")
        .factory("RestaurantService", RestaurantService);

    function RestaurantService ($http, $q) {

        var api = {
            createRestaurant : createRestaurant
        };
        return api;

        function createRestaurant (restaurant) {
            var deferred = $q.defer();
            $http
                .post("/api/project/restaurant", restaurant)
                .then(function(restaurant){
                    deferred.resolve(restaurant);
                });

            return deferred.promise;
        }
    }
}) ();
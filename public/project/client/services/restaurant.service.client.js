"use strict";
(function () {
    angular
        .module("LoyalUApp")
        .factory("RestaurantService", RestaurantService);

    function RestaurantService ($http, $q) {

        var api = {
            createRestaurant : createRestaurant,
            getAllRestaurantsAndCoupons : getAllRestaurantsAndCoupons,
            getRestaurantByLocuId : getRestaurantByLocuId
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

        function getAllRestaurantsAndCoupons () {
            var deferred = $q.defer();
            $http
                .get("/api/project/restaurant")
                .then(function(restaurant){
                    deferred.resolve(restaurant);
                });

            return deferred.promise;
        }

        function getRestaurantByLocuId (restLocuId) {
            var deferred = $q.defer();
            $http
                .get("/api/project/restaurant?locuId=" + restLocuId)
                .then(function(restaurant){
                    deferred.resolve(restaurant);
                });

            return deferred.promise;
        }
    }
}) ();
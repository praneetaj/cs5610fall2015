"use strict";
(function () {
    angular
        .module("LoyalUApp")
        .factory("PlacePhotoService", PlacePhotoService);

    function PlacePhotoService ($http, $q) {
        var api = {
            getPictureUrlFromGoogle : getPictureUrlFromGoogle
        };

        return api;

        function getPictureUrlFromGoogle (name, city) {
            var deferred = $q.defer();

            $http
                .get("/api/project/google?restaurantName=" + name + "&city=" + city)
                .then(function (place) {
                    console.log(place);
                    deferred.resolve(place);
                });

            return deferred.promise;
        }
    }
})();
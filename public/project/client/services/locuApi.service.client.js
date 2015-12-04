(function () {
    angular
        .module ("LoyalUApp")
        .factory ("LocuApiService", LocuApiService);

    function LocuApiService ($http, $q) {
        var api = {
            getMenuByLocuId : getMenuByLocuId,
            extractMenuFromResponse : extractMenuFromResponse,
            findRestaurantByNameAndCity : findRestaurantByNameAndCity
        };
        return api;

        function getMenuByLocuId (locuId) {
            var deferred = $q.defer();
            $http
                .get("/api/project/locu/" + locuId)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function findRestaurantByNameAndCity (name, city) {
            var deferred = $q.defer();
            $http
                .get("/api/project/locu?restaurantName=" + name + "&city=" + city)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function extractMenuFromResponse (response) {
            var menuItems = [];
            var menus = response.body.venues[0].menus;

            len = response.body.venues[0].menus.length;
            for (var i = 0; i < menus.length; i++) {
                for (var j = 0; j < menus[i].sections.length; j++) {
                    for (var k = 0; j < menus[i].sections[j].subsections.length; j++) {
                        for (var l = 0; l < menus[i].sections[j].subsections[k].contents.length; l++) {
                            var item = menus[i].sections[j].subsections[k].contents[l].name;
                            if (typeof item != "undefined")
                                menuItems.push(item);
                        }
                    }
                }
            }
            return menuItems;
        }
    }
})();
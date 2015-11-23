(function () {
    angular
        .module("PageEditorApp")
        .factory("PageService", PageService);

    function PageService ($http, $q) {
        var api = {
            getAllPages : getAllPages,
            addPage : addPage
        };
        return api;

        function getAllPages () {
            var deferred = $q.defer();
            $http
                .get("/api/experiments/mongo/pe/page")
                .success(function (pages) {
                    deferred.resolve(pages);
                });
            return deferred.promise;
        }

        function addPage (page) {
            var deferred = $q.defer();
            $http
                .post("/api/experiments/mongo/pe/page", page)
                .success(function (pages) {
                    deferred.resolve(pages);
                });
            return deferred.promise;
        }
    }
}) ();
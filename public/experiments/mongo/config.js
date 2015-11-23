(function() {
    angular
        .module("PageEditorApp")
        .config(Configuration);

    function Configuration ($routeProvider) {
        $routeProvider
            .when("/page", {
                templateUrl: "client/page/page.list.view.html",
                controller: "PageListController",
                controllerAs: "model"
            });
    }
})();
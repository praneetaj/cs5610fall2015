(function () {
    angular
        .module("PageEditorApp")
        .controller("PageDetailsController", PageDetailsController);

    function PageDetailsController (PageService, $routeParams) {
        var model = this;
        var pageId = $routeParams.pageId;
        console.log(pageId);
        /*
        function init() {
            PageService.getPageById(pageId);
        }
        init();*/
    }
})();
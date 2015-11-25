(function () {
    angular
        .module("PageEditorApp")
        .controller("PageContentEditorController", PageContentEditorController);

    function PageContentEditorController (PageService, $routeParams) {
        var pageId = $routeParams["pageId"];
        var contentIndex = $routeParams["index"];

        var model = this;
        model.addContent = addContent;
        model.removeContent = removeContent;
        console.log(pageId);

        function init() {
            PageService
                .getPageById(pageId)
                .then(function (page) {
                    model.page = page;
                });
        }
        init();
    }
})();
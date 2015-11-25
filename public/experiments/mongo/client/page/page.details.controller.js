(function () {
    angular
        .module("PageEditorApp")
        .controller("PageDetailsController", PageDetailsController);

    function PageDetailsController (PageService, $routeParams) {
        var pageId = $routeParams["pageId"];

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

        function addContent (contentType) {
            PageService
                .addContent (pageId, contentType)
                .then (function (page) {
                    model.page = page;
                console.log(page);
                });
        }

        function removeContent (content) {
            var contentIndex = model.content.indexOf(content);
            PageService
                .removeContent (model.page._id, contentIndex)
                .then (function (page) {
                model.page = page;
                });
        }
    }
})();
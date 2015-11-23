(function () {
    angular
        .module("PageEditorApp")
        .controller("PageListController", PageListController);

    function PageListController () {
        var model = this;
        model.pages = "Hello";
    }
}) ();
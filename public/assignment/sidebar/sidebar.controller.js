(function () {
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($location, $scope) {
        $location.$scope = $scope;
    }
}) ();
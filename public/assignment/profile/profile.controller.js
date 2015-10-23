(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, UserService) {
        var currUserName = $rootScope.userName;
        var currPassword = $rootScope.password;
        var currIndex = UserService.findUserByUsernameAndPassword(currUserName, currPassword);
        console.log(currIndex);
        var users = UserService.findAllUsers();
        $scope.userName = users[currIndex].userName;
        $scope.password = users[currIndex].password;
        $scope.email = users[currIndex].email;
    }
}) ();
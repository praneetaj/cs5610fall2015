(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, UserService) {

        $scope.register = register;

        function register() {
            $rootScope.userName = $scope.userName;
            $rootScope.password = $scope.password1;
            var newUser = {
                userName: $scope.userName,
                password: $scope.password1,
                email: $scope.email
            };
            UserService.createUser(newUser);
            var users = UserService.findAllUsers();
            console.log(users);
            console.log($rootScope);
        }
    }
}) ();
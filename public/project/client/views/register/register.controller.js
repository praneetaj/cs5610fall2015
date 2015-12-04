(function () {
    angular
        .module ("LoyalUApp")
        .controller ("RegisterController", RegisterController);

    function RegisterController (UserService, LocuApiService) {
        var model = this;
        model.addCustomerUser = addCustomerUser;
        model.search = searchRestaurantFromLocu;
        model.createAdminUser = createAdminUser;

        function addCustomerUser () {
            var newuser = {
                loyalUUsername : model.newuser.loyalUUsername,
                password : model.newuser.password,
                googleUsername : null, //not sure if google api returns this
                googleId : null,
                email : model.newuser.email,
                role : "CUSTOMER",
                restLocuId : null,
                firstName : model.newuser.firstName,
                lastName : model.newuser.password
            };
            UserService.createUser(newuser).then(function (response) {

            });
        }

        function searchRestaurantFromLocu () {
            LocuApiService.findRestaurantByNameAndCity(model.restaurantName, model.city).then(function (response) {
                model.restaurants = response.body.venues;
            });
        }

        function createAdminUser () {
            console.log(model.registeredRestaurant);
            var newuser = {
                loyalUUsername : model.newuser.loyalUUsername,
                password : model.newuser.password,
                googleUsername : null, //not sure if google api returns this
                googleId : null,
                email : model.newuser.email,
                role : "ADMIN",
                restLocuId : model.registeredRestaurant,
                firstName : model.newuser.firstName,
                lastName : model.newuser.password
            };
            UserService.createUser(newuser).then(function (response) {
                console.log(response);
            });
        }
    }
}) ();
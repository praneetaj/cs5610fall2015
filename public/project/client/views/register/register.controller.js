(function () {
    angular
        .module ("LoyalUApp")
        .controller ("RegisterController", RegisterController);

    function RegisterController ($rootScope, $location, UserService, LocuApiService,
                                 RestaurantService, PlacePhotoService) {
        var model = this;
        model.search = searchRestaurantFromLocu;
        model.createUser = createUser;
        model.change = change;
        model.searchUsername = searchUsername;

        function change () {
            var role = model.newuser.role;
            model.pageLoad = true;
            if (role == "CUSTOMER")
                model.newrole = false;
            else
                model.newrole = true;
        }

        function isDuplicateUsername (username) {
            UserService.findUserByUsername(username).then(function(user) {
                if (user)
                    return true;
                else
                    return false;
            });
        }

        function searchUsername () {
            UserService.findUserByUsername(model.newuser.loyalUUsername).then(function(user) {
                if (user != null) {
                    model.newuser.loyalUUsername = "";
                    //model.duplicateUsernameAlert = "Username already taken, choose a different username!";
                    alert("Username already taken, choose a different username!");
                }
            });
        }

        function createUser () {
             if (validateInput()) {
                if (model.newuser.role == "CUSTOMER") {
                    createCustomerUser();
                } else if (model.newuser.role == "ADMIN") {
                    createAdminUser();
                }
             }
        }

        function validateInput () {
            if (typeof model.newuser == "undefined") {
                alert("Please fill the form!");
                return false;
            } else if (typeof model.newuser.role == "undefined" ||
                typeof model.newuser.loyalUUsername == "undefined" ||
                typeof model.newuser.password == "undefined" ||
                typeof model.password2 == "undefined" ||
                typeof model.newuser.loyalUUsername == "" ||
                typeof model.newuser.password == "" ||
                typeof model.password2 == "") {
                alert("Please fill all the fields!");
                return false;
            } else if (model.newuser.password != model.password2) {
                alert("Passwords do not match!");
                return false;
            } else
                return true;
        }

        function createCustomerUser () {
            var newuser = {
                loyalUUsername : model.newuser.loyalUUsername,
                password : model.newuser.password,
                googleUsername : null, //not sure if google api returns this
                googleId : null,
                email : "",
                role : "CUSTOMER",
                restLocuId : null,
                firstName : "",
                lastName : ""
            };
            UserService.createUser(newuser).then(function (response) {
                console.log(response);
                $rootScope.loggedInUser = response;
                $location.url("/profile");
            });
        }

        function searchRestaurantFromLocu () {
            LocuApiService.findRestaurantByNameAndCity(model.restaurantName, model.city).then(function (response) {
                console.log(response);
                model.restaurants = response.body.venues;
            });
        }

        function createAdminUser () {
            var index = model.registeredRestaurant;
            var newuser = {
                loyalUUsername : model.newuser.loyalUUsername,
                password : model.newuser.password,
                googleUsername : null, //not sure if google api returns this
                googleId : null,
                email : "",
                role : "ADMIN",
                restLocuId : model.restaurants[index].locu_id,
                firstName : model.newuser.firstName,
                lastName : model.newuser.password
            };
            PlacePhotoService.getPictureUrlFromGoogle (model.restaurants[index].name, model.restaurants[index].location.locality)
                .then (function (place) {
                //console.log(place.data);
                //model.restImage = place.data;
                    var restEntry = {
                        restLocuId : model.restaurants[index].locu_id,
                        name : model.restaurants[index].name,
                        zipcode : model.restaurants[index].location.postal_code,
                        city : model.restaurants[index].location.locality,
                        image_url : place.data,
                        coupons : []
                    };
                    RestaurantService.createRestaurant(restEntry).then(function (response) {
                        console.log(response);
                    });
            });

            UserService.createUser(newuser).then(function (response) {
                console.log(response);
                $rootScope.loggedInUser = response;
                $location.url("/profile");
            });
        }
    }
}) ();
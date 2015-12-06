"use strict";
(function () {
    angular
        .module("LoyalUApp")
        .config(Configure);

    function Configure ($routeProvider) {
        $routeProvider
            .when ("/home", {
                templateUrl : "views/home/home.view.html"
            })
            .when ("/searchWebCoupons", {
                templateUrl : "views/searchWebCoupons/searchWebCoupons.view.html",
                controller : "SearchWebCouponsController",
                controllerAs : "model"
            })
            .when ("/searchLoyalUCoupons", {
                templateUrl : "views/searchLoyalUCoupons/searchLoyalUCoupons.view.html",
                controller : "SearchLoyalUCouponsController",
                controllerAs : "model"
            })
            .when ("/details/:dealId", {
                templateUrl : "views/searchWebCoupons/searchWebCoupons.details.view.html",
                controller : "SearchWebCouponsDetailsController",
                controllerAs : "model"
            })
            .when ("/restaurantCoupons", {
                templateUrl : "views/restaurantCoupons/restaurantQuantityCoupons.view.html",
                controller : "RestaurantQuantityCouponsController",
                controllerAs : "model",
                resolve : {
                    loggedIn : checkLoggedIn
                }
            })
            .when ("/restaurantAmountCoupons", {
                templateUrl : "views/restaurantCoupons/restaurantAmountCoupons.view.html",
                controller : "RestaurantAmountCouponsController",
                controllerAs : "model",
                resolve : {
                    loggedIn : checkLoggedIn
                }
            })
            .when ("/customerAmountCoupons", {
                templateUrl : "views/customerCoupons/customerAmountCoupons.view.html",
                controller : "CustomerAmountCouponsController",
                controllerAs : "model",
                resolve : {
                    loggedIn : checkLoggedIn
                }
            })
            .when ("/customerQuantityCoupons", {
                templateUrl : "views/customerCoupons/customerQuantityCoupons.view.html",
                controller : "CustomerQuantityCouponsController",
                controllerAs : "model",
                resolve : {
                    loggedIn : checkLoggedIn
                }
            })
            .when ("/register", {
                //templateUrl : "views/register/register-user.view.html",
                templateUrl : "views/register/register.view.html",
                controller : "RegisterController",
                controllerAs : "model"
            })
            /*
            .when ("/register-restaurant", {
                //templateUrl : "views/register/register-restaurant.view.html",
                templateUrl : "views/register/register.view.html",
                controller : "RegisterController",
                controllerAs : "model"
            })
            */
            .when ("/createCoupons", {
                templateUrl : "views/restaurantCoupons/createCoupon.view.html",
                controller : "CreateCouponController",
                controllerAs : "model",
                resolve : {
                    loggedIn : checkLoggedIn
                }
            })
            .when ("/recordTransaction", {
                templateUrl : "views/recordTransaction/recordTransaction.view.html",
                controller : "RecordTransactionController",
                controllerAs : "model",
                resolve : {
                    loggedIn : checkLoggedIn
                }
            })
            .when ("/login", {
                templateUrl : "views/login/login.view.html",
                controller : "LoginController",
                controllerAs : "model"
            })
            .otherwise({
                redirectTo : "/home"
            });
    }
} )();

var checkLoggedIn = function($q, $timeout, $http, $location, $rootScope)
{
    var deferred = $q.defer();

    $http.get('/api/project/loggedin').success(function(user)
    {
        if (user != '0')
        {
            $rootScope.loggedInUser = user;
            if ($rootScope.loggedInUser.role == 'ADMIN') {
                $rootScope.admin = true;
            } else if ($rootScope.loggedInUser.role == 'CUSTOMER') {
                $rootScope.admin = false;
            }
            deferred.resolve();
        }
        else
        {
            $rootScope.errorMessage = 'You need to log in.';
            deferred.reject();
            $location.url('/login');
        }
    });

    return deferred.promise;
};
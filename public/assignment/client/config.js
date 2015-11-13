"use strict";
(function(){
	angular
		.module("FormBuilderApp")
		.config(Configure);
		
	function Configure($routeProvider) {
		$routeProvider
			.when("/home", {
				templateUrl: "views/home/home.view.html"
			})
			.when("/profile", {
				templateUrl: "views/profile/profile.view.html",
				controller: "ProfileController as model"
			})
			.when("/forms", {
				templateUrl: "views/form/form.view.html",
				controller: "FormController"
			})
			.when("/register", {
				templateUrl: "views/register/register.view.html",
				controller: "RegisterController"
			})
			.when("/login", {
				templateUrl: "views/login/login.view.html",
				controller: "LoginController as model"
			})
			.otherwise({
				redirectTo: "/home"
			});
	}
}) ();
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
				controller: "FormController as model"
			})
			.when("/register", {
				templateUrl: "views/register/register.view.html",
				controller: "RegisterController as model"
			})
			.when("/login", {
				templateUrl: "views/login/login.view.html",
				controller: "LoginController as model"
			})
			.when("/fields", {
				templateUrl: "views/field/field.view.html",
				controller: "FieldController as model"
			})
			.when("/user/:userId/form/:formId/fields", {
				templateUrl: "views/field/field.view.html",
				controller: "FieldController as model"
			})
			.otherwise({
				redirectTo: "/home"
			});
	}
}) ();
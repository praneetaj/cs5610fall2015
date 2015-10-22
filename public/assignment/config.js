(function(){
	angular
		.module("FormBuilderApp")
		.config(Configure);
		
	function Configure($routeProvider) {
		$routeProvider
			.when("/home", {
				templateUrl: "home/home.view.html"
			})
			.when("/profile", {
				templateUrl: "profile/profile.html"
			})
			.when("/admin", {
				templateUrl: "admin/admin.html"
			})
			.when("/forms", {
				templateUrl: "forms/forms.html"
			})
			.when("/register", {
				templateUrl: "register/register.html"
			})
			.when("/login", {
				templateUrl: "login/login.view.html"
			})
			.otherwise({
				redirectTo: "/home"
			});
	}
}) ();
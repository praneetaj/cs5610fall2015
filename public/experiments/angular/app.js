(function() {
	angular
		.module("WhiteBoardApp", ["ngRoute"])
		.config(Configure);
		
	function Configure($routeProvider) {
		$routeProvider
			.when("/", {
				templateUrl: "home.html"	
			})
			.when("/register", {
				templateUrl: "register.html"	
			});
	} 
}) ();
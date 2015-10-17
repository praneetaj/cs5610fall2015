(function() {
	angular
		.module("WhiteBoardApp", ["ngRoute"])
		.config(Configure);
		
	function Configure($routeProvider) {
		$routeProvider
			.when("/", {
				templateURL: "home.html"	
			})
			.when("/register", {
				templateURL: "register.html"	
			});
	} 
}) ();
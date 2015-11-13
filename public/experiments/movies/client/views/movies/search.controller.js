(function() {
	angular
		.module("MovieApp")
		.controller("SearchMovieController", SearchMovieController);

	function SearchMovieController (MovieService) {
		var model = this;
		model.search = search;
		model.like = like;

		function like (idIMDB) {
			MovieService.likes(idIMDB).then(function(response) {
			});
		}

		function search (title) {
			MovieService.searchMovieByTitle(title).then(function(response){
				model.results = response;
				console.log(response);
			});
		}
	}
}) ();
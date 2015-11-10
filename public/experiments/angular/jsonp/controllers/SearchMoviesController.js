(function () {
    angular
        .module("MovieApp")
        .controller("SearchMoviesController", SearchMoviesController);

    function SearchMoviesController($scope, $http, MovieService) {

        $scope.SearchMovie = function(title) {
            MovieService.searchMovieByTitle(title, function(response) {
                $scope.response = response;
            });
            console.log(title);
        }

        $scope.likeMovie = function(idIMDB) {
            MovieService.likeMovie(idIMDB, function (response) {
                    
            });
        }
    }
}) ();
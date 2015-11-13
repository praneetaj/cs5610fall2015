(function () {
    angular
        .module("MovieApp")
        .factory("MovieService", MovieService);

    function MovieService ($http, $q) {

        var url = "http://www.myapifilms.com/imdb?title=TITLE&format=JSONP&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=N&exactFilter=0&limit=5&forceYear=0&lang=en-us&actors=N&biography=0&trailer=0&uniqueName=0&filmography=0&bornDied=0&starSign=0&actorActress=0&actorTrivia=0&movieTrivia=0&awards=0&moviePhotos=N&movieVideos=N&similarMovies=0&adultSearch=0&callback=JSON_CALLBACK";

        var api = {
            searchMovieByTitle : searchMovieByTitle,
            likes : likes
        };
        return api;

        function searchMovieByTitle (title) {
            var deferred = $q.defer();
            var searchUrl = url.replace("TITLE", title);
            $http
                .jsonp(searchUrl)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function likes (idIMDB) {
            var deferred = $q.defer();
            $http
                .post("/api/experiments/movies/likes/"+idIMDB)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
/*
        function likeMovie(idIMDB, callback) {
            var likes = {
                userId: 123,
                idIMDB: idIMDB
            };


            $http
                .post("/api/experiments/angular/jsonp/user/123/movie/"+idIMDB+"/like")
                .success(callback);
        }  */
    }
}) ();
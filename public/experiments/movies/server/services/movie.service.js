module.exports = function(app) {
    app.post('/api/experiments/movies/likes/:idIMDB', likes);

    function likes (req, res) {
        var idIMDB = req.params.idIMDB;
        console.log("likes: "+idIMDB);
    }
};
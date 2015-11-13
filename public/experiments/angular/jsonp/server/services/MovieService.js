module.exports = function(app) {
    app.post('/api/experiments/angular/jsonp/user/:userId/movie/:idIMDB/like', function(req, res) {
        var userId = req.params.userId;
        var idIMDB = req.params.idIMDB;
        console.log("here");
        console.log(userId + " "+ idIMDB);

    });
};
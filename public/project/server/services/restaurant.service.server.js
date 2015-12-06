module.exports = function (app, model) {
    app.post("/api/project/restaurant", createRestaurant);
    //app.get("/api/project/restaurant", createRestaurant);

    function createRestaurant (req, res) {
        model
            .createRestaurant (req.body)
            .then (function (restaurant) {
                res.json (restaurant);
            });
    }
};
module.exports = function (app, model) {
    app.get("/api/project/restcoupon", getRestaurantCoupons);

    function getRestaurantCoupons (req, res) {
        var searchParam = req.query.searchParam;
        var locuId = req.query.locuId;

        if (typeof searchParam != "undefined") {
            model
                .getRestCouponsByZipcodeOrCity (searchParam)
                .then(function (response) {
                res.json(response);
            });
        } else if (typeof locuId != "undefined") {
            model
                .getRestCouponsByLocuId (locuId)
                .then(function (response) {
                    res.json(response);
                });
        }
    }
};
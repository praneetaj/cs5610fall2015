module.exports = function (app, model) {
    app.get("/api/project/restcoupon/:searchParam", getRestCouponsByZipcodeOrCity);

    function getRestCouponsByZipcodeOrCity (req, res) {
        model
            .getRestCouponsByZipcodeOrCity (req.params.searchParam)
            .then (function (response) {
                res.json (response);
            });
    }
};
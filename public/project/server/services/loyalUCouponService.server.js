module.exports = function (app, model) {
    app.get("/api/project/restaurant", getRestaurant);
    app.put("/api/project/restaurant/:locuId", addCouponForRest);
    app.delete("/api/project/restaurant/:locuId/coupon/:index", removeCouponByLocuIdAndCouponIndex);
    app.get("/api/project/restaurant/:locuId/coupon/:index", getCouponByLocuIdAndCouponIndex);
    app.put("/api/project/restaurant/:locuId/coupon/:index", updateCouponByLocuIdAndCouponIndex);

    function getRestaurant (req, res) {
        //console.log("inside loyal u search services server");
        var searchParam = req.query.search;
        var locuId = req.query.locuId;
        //console.log(searchParam);

        if (typeof searchParam != "undefined") {
            console.log("inside search param");
            model
                .getRestCouponsByZipcodeOrCity (searchParam)
                .then(function (response) {
                res.json(response);
            });
        } else if (typeof locuId != "undefined") {
            model
                .getRestByLocuId (locuId)
                .then(function (response) {
                    res.json(response);
                });
        }
    }

    function addCouponForRest (req, res) {
        model
            .addCouponForRest (req.params.locuId, req.body)
            .then(function (response) {
                console.log("coupon create server:" + response);
                res.json(response);
            });
    }

    function removeCouponByLocuIdAndCouponIndex (req, res) {
        model
            .removeCouponByLocuIdAndCouponIndex (req.params.locuId, req.params.index)
            .then(function (response) {
                res.json(response);
            });
    }

    function getCouponByLocuIdAndCouponIndex (req, res) {
        model
            .getCouponByLocuIdAndCouponIndex (req.params.locuId, req.params.index)
            .then(function (response) {
                res.json(response);
            });
    }

    function updateCouponByLocuIdAndCouponIndex (req, res) {
        model
            .updateCouponByLocuIdAndCouponIndex (req.params.locuId, req.params.index, req.body)
            .then(function (response) {
                res.json(response);
            });
    }
};
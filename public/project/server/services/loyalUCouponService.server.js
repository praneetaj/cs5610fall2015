module.exports = function (app, model) {
    app.get("/api/project/restaurant", getRestaurant);
    app.put("/api/project/restaurant/:locuId", addCouponForRest);
    app.delete("/api/project/restaurant/:locuId/coupon/:index", removeCouponByLocuIdAndCouponIndex);
    app.get("/api/project/restaurant/:locuId/coupon/:index", getCouponByLocuIdAndCouponIndex);
    app.get("/api/project/restaurant/:locuId/coupon", getAllCouponsByLocuId);
    app.put("/api/project/restaurant/:locuId/coupon/:index", updateCouponByLocuIdAndCouponIndex);

    function getRestaurant (req, res) {
        var searchParam = req.query.search;
        var locuId = req.query.locuId;

        if (typeof searchParam == "undefined" && typeof locuId == "undefined") {
            model
                .getAllRestaurantsAndCoupons ()
                .then(function (response) {
                    res.json(response);
                });
        } else if (typeof searchParam != "undefined") {
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

    function getAllCouponsByLocuId (req, res) {
        var expired = req.query.expired;
        if (typeof expired=="undefined" || expired == "1") {
            model
                .getAllCouponsByLocuId(req.params.locuId)
                .then(function (response) {
                    res.json(response);
                });
        } else if (expired == "0") {
            model
                .getAllUnexpiredCouponsByLocuId(req.params.locuId)
                .then(function (response) {
                    res.json(response);
                });
        }
    }
};
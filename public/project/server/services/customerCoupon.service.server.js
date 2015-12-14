module.exports = function (app, model) {
    app.put("/api/project/customer/:customerId/coupon", createOrUpdateCustCouponByCustId);
    app.get("/api/project/customer/:customerId/coupon", getAllCustCouponsByCustId);
    app.delete("/api/project/customer/coupon/:couponId", deleteCustCouponsByCouponId);
    app.get("/api/project/customer/coupon/:couponId", getCustCouponsByCouponId);
    app.get("/api/project/customer/rest/:restLocuId", getAggregatedRedeemCountByLocuId);

    function deleteCustCouponsByCouponId (req, res) {
        model
            .deleteCustCouponsByCouponId (req.params.couponId)
            .then (function (response) {
                res.json (response);
            });
    }

    function getAggregatedRedeemCountByLocuId (req, res) {
        model
            .getAggregatedRedeemCountByLocuId (req.params.restLocuId)
            .then (function (response) {
                res.json (response);
            });
    }

    function getCustCouponsByCouponId (req, res) {
        model
            .getCustCouponsByCouponId (req.params.couponId)
            .then (function (response) {
                res.json (response);
            });
    }

    function createOrUpdateCustCouponByCustId (req, res) {
        console.log("server side, about to record transaction");
        model
            .createOrUpdateCustCouponByCustId (req.params.customerId, req.body)
            .then (function (response) {
                console.log(response);
                if (response == "0") {
                    console.log("service: response was 0");
                    model
                        .createCustomerCoupon (req.body)
                        .then (function (response) {
                            console.log("created customer record");
                            res.json(response);
                    })
                }
                else {
                    console.log("updated customer record");
                    res.json(response);
                }
            });
    }

    function getAllCustCouponsByCustId (req, res) {
        model
            .getAllCustCouponsByCustId (req.params.customerId)
            .then (function (response) {
                res.json (response);
            });
    }
};
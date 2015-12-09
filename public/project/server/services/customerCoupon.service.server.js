module.exports = function (app, model) {
    //app.post("/api/project/customer/:customerId/coupon", createCustomerCouponEntryById);
    app.put("/api/project/customer/:customerId/coupon", createOrUpdateCustCouponByCustId);
    app.get("/api/project/customer/:customerId/coupon", getAllCustCouponsByCustId);
    app.delete("/api/project/customer/couponId/:couponId", deleteCustCouponsByCouponId);

    //function createCustomerCouponEntryById (req, res) {
    //    model
    //        .createCustomerCouponEntryById (req.params.customerId, req.body)
    //        .then (function (response) {
    //            res.json (response);
    //        });
    //}

    function deleteCustCouponsByCouponId (req, res) {
        model
            .deleteCouponsByCouponId (req.params.couponId)
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
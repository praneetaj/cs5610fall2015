module.exports = function (app, model) {
    //app.post("/api/project/customer/:customerId/coupon", createCustomerCouponEntryById);
    app.put("/api/project/customer/:customerId/coupon", createOrUpdateCustCouponByCustId);
    app.get("/api/project/customer/:customerId/coupon", getAllCustCouponsByCustId);

    //function createCustomerCouponEntryById (req, res) {
    //    model
    //        .createCustomerCouponEntryById (req.params.customerId, req.body)
    //        .then (function (response) {
    //            res.json (response);
    //        });
    //}

    function createOrUpdateCustCouponByCustId (req, res) {
        model
            .createOrUpdateCustCouponByCustId (req.params.customerId, req.body)
            .then (function (response) {
                res.json (response);
            });
    }

    function getAllCustCouponsByCustId (req, res) {
        //console.log("zzzzzz"+req.session.passport.user);
        model
            .getAllCustCouponsByCustId (req.params.customerId)
            .then (function (response) {
                res.json (response);
            });
    }
};
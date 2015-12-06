var q = require ("q");

module.exports = function (mongoose, db) {
    var CustomerCouponSchema = require ("./customerCoupon.schema.js") (mongoose);
    var CustomerCouponModel = mongoose.model ("CustomerCouponModel", CustomerCouponSchema);

    //var RestaurantSchema = require ("./restaurant.schema.js") (mongoose);
    //var RestaurantModel = mongoose.model ("RestaurantModel", RestaurantSchema);

    var api = {
        createCustomerCouponByCustId : createCustomerCouponByCustId,
        createCustomerCoupon : createCustomerCoupon,
        createOrUpdateCustCouponByCustId : createOrUpdateCustCouponByCustId,
        getAllCustCouponsByCustId : getAllCustCouponsByCustId
        //getCustCouponsByCustIdDetailed : getCustCouponsByCustIdDetailed
    };
    return api;

    function createCustomerCoupon (customerEntry) {
        var deferred = q.defer ();

        CustomerCouponModel.create (customerEntry, function (err, entry) {
            if (err)
                deferred.reject(err);
            else
                deferred.resolve (entry);
        });
        return deferred.promise;
    }

    function createCustomerCouponByCustId (customerId, customerEntry) {
        var deferred = q.defer ();

        CustomerCouponModel.create (customerEntry, function (err, entry) {
            if (err)
                deferred.reject(err);
            else
                deferred.resolve (entry);
        });
        return deferred.promise;
    }

    function getAllCustCouponsByCustId (customerId) {
        var deferred = q.defer ();

        CustomerCouponModel.find ({"customerId" : customerId}, function (err, coupons) {
            if (err)
                deferred.reject(err);
            else
                deferred.resolve (coupons);
        });
        return deferred.promise;
    }

    function createOrUpdateCustCouponByCustId (customerId, customerCoupon) {
        var deferred = q.defer ();

        CustomerCouponModel.find ({"customerId" : customerId}, function (err, coupons) {
            if (err)
                deferred.reject(err);
            else {
                var flag = false;
                for (var i = 0; i < coupons.length; i++) {
                    if (coupons[i].couponId == customerCoupon.couponId) {
                        coupons[i].amount = parseInt(coupons[i].amount) + parseInt(customerCoupon.amount);
                        coupons[i].currQuantity = parseInt(coupons[i].currQuantity) + parseInt(customerCoupon.currQuantity);
                        coupons[i].totalQuantity = parseInt(coupons[i].totalQuantity) +  parseInt(customerCoupon.currQuantity);
                        coupons[i].save (function (err, response) {
                            deferred.resolve(response);
                        });
                        flag = true;
                        break;
                    }
                }
                if (!flag) {
                    createCustomerCoupon (customerCoupon);
                }
            }
        });
        return deferred.promise;
    }

    function getCustCouponsByCustIdDetailed (customerId) {
        var deferred = q.defer ();

        CustomerCouponModel.find ({"customerId" : customerId}, function (err, custCoupons) {
            if (err)
                deferred.reject(err);
            else {
                RestaurantModel.getAllRestaurantsAndCoupons().then(function(restaurants) {
                    var result = [];
                    for (var i = 0; i < custCoupons.length; i++) {
                        for (var j = 0; j < restaurants.length; j++) {
                            if (custCoupons[i].restLocuId == restaurants[j].restLocuId) {
                                for (var k = 0; k < restaurants[j].coupons.length; k++) {
                                    if (custCoupons[i].couponId == restaurants[j].coupons[k]._id) {
                                        var details = {
                                            customerId : custCoupons[i].customerId,
                                            restLocuId : custCoupons[i].restLocuId,
                                            couponId : custCoupons[i].couponId,
                                            couponType : restaurants[j].coupons[k].couponType,
                                            couponLabel : restaurants[j].coupons[k].label,
                                            userCurrQuantity : custCoupons[i].currQuantity,
                                            userTotalQuantity : custCoupons[i].totalQuantity,
                                            userAmount : custCoupons[i].amount,
                                            description : restaurants[j].coupons[k].description,
                                            expiry : restaurants[j].coupons[k].expiry,
                                            restQuantity : restaurants[j].coupons[k].quantity,
                                            restAmount : restaurants[j].coupons[k].amount
                                        };
                                        result.push(details);
                                        break;
                                    }
                                }
                                break;
                            }
                        }
                    }
                    deferred.resolve (result);
                });
            }
        });
        return deferred.promise;
    }
};
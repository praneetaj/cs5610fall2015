var q = require ("q");

module.exports = function (mongoose, db) {
    var CustomerCouponSchema = require ("./customerCoupon.schema.js") (mongoose);
    var CustomerCouponModel = mongoose.model ("CustomerCouponModel", CustomerCouponSchema);

    var api = {
        createCustomerCouponByCustId : createCustomerCouponByCustId,
        createCustomerCoupon : createCustomerCoupon,
        createOrUpdateCustCouponByCustId : createOrUpdateCustCouponByCustId,
        getAllCustCouponsByCustId : getAllCustCouponsByCustId,
        deleteCustCouponsByCouponId : deleteCustCouponsByCouponId,
        getCustCouponsByCouponId : getCustCouponsByCouponId,
        getAggregatedRedeemCountByLocuId : getAggregatedRedeemCountByLocuId
    };
    return api;

    function getAggregatedRedeemCountByLocuId (restLocuId) {
        var deferred = q.defer ();

        CustomerCouponModel.aggregate ({"$match":{"restLocuId":restLocuId}}, {"$group":{"_id": "$couponId", "totalRedeem":{"$sum":"$redeemCount"}}}, function (err, entry) {
            if (err)
                deferred.reject(err);
            else
                deferred.resolve (entry);
        });
        return deferred.promise;
    }

    function createCustomerCoupon (customerCoupon) {
        var deferred = q.defer ();

        var newCoupon, result, msg, rem, x, y, z, freeItems, redeemCount;
        if (customerCoupon.restCoupon.couponType == "QUANTITY") {
            var temp = calculateQtyDiscount(0, parseInt(customerCoupon.currQuantity),
                customerCoupon.restCoupon.freeQuantity, customerCoupon.restCoupon.quantity);
            msg = "You have to pay for " + temp.paid + " items.";
            msg = msg + "You get " + temp.free + " items free.";
            msg = msg + "Your new counter is " + temp.finQty + " items.";
            result = {
                msg : msg
            };
            newCoupon = {
                customerId: customerCoupon.customerId,
                restLocuId: customerCoupon.restLocuId,
                couponId: customerCoupon.couponId,
                currQuantity: temp.finQty,
                totalQuantity: parseInt(customerCoupon.currQuantity),
                amount: null,
                redeemCount : temp.redeem
            };
        } else {        //AMOUNT COUPON
            var discount = null;
            var redeem = 0;
            if (parseInt(customerCoupon.amount) >= customerCoupon.restCoupon.amount) {
                discount = customerCoupon.restCoupon.discount;
                msg = "From now on you will get a discount of " + discount + "%";
                redeem = 1;
            } else {
                rem = customerCoupon.restCoupon.amount - parseInt(customerCoupon.amount);
                msg = "You have to spend $" + rem + " more to get a discount!";
            }
            newCoupon = {
                customerId: customerCoupon.customerId,
                restLocuId: customerCoupon.restLocuId,
                couponId: customerCoupon.couponId,
                currQuantity: null,
                totalQuantity: null,
                amount: customerCoupon.amount,
                redeemCount : redeem
            };
            result = {
                msg : msg
            };
        }

        CustomerCouponModel.create (newCoupon, function (err, entry) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(result);
            }
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
                var result, msg;
                console.log("users coupons length:" + coupons.length);
                for (var i = 0; i < coupons.length; i++) {
                    if (coupons[i].couponId == customerCoupon.couponId) {
                        if (customerCoupon.restCoupon.couponType == "AMOUNT") {
                            coupons[i].amount = coupons[i].amount + parseInt(customerCoupon.amount);
                            var discount = null;
                            if (coupons[i].amount >= customerCoupon.restCoupon.amount) {
                                discount = customerCoupon.restCoupon.discount;
                                coupons[i].redeemCount = coupons[i].redeemCount + 1;
                                msg = "From now on you will get a discount of " + discount + "%";
                            } else {
                                var zz = customerCoupon.restCoupon.amount - coupons[i].amount;
                                msg = "To get a discount you have to spend $" + zz + " more!";
                            }
                            result = {
                                msg : msg
                            };
                        } else {  //QUANTITY COUPON
                            var temp = calculateQtyDiscount(coupons[i].currQuantity, parseInt(customerCoupon.currQuantity),
                                customerCoupon.restCoupon.freeQuantity, customerCoupon.restCoupon.quantity);
                            console.log(temp);
                            msg = "You have to pay for " + temp.paid + " items.";
                            msg = msg + "You get " + temp.free + " items free.";
                            msg = msg + "Your new counter is " + temp.finQty + " items.";
                            result = {
                                msg : msg
                            };
                            coupons[i].currQuantity = temp.finQty;
                            coupons[i].totalQuantity += parseInt(customerCoupon.currQuantity);
                            coupons[i].redeemCount += temp.redeem;
                        }
                        coupons[i].save (function (err, response) {
                            console.log("model: updated entry");
                            deferred.resolve(result);
                        });
                        flag = true;
                        break;
                    }
                }
                if (!flag) {
                    console.log("model, did not find user coupon");
                    deferred.resolve("0");
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

    function deleteCustCouponsByCouponId (couponId) {
        var deferred = q.defer ();

        CustomerCouponModel.remove ({"couponId" : couponId}, function (err, coupons) {
            if (err)
                deferred.reject(err);
            else
                deferred.resolve (coupons);
        });
        return deferred.promise;
    }

    function getCustCouponsByCouponId (couponId) {
        var deferred = q.defer ();

        CustomerCouponModel.find ({"couponId" : couponId}, function (err, coupons) {
            if (err)
                deferred.reject(err);
            else
                deferred.resolve (coupons);
        });
        return deferred.promise;
    }

    function calculateQtyDiscount (initQty, bought, freeQty, thldQty) {
        console.log(initQty + " " + bought + " " + freeQty + " " + thldQty);
        var free, paid, redeem, finQty, result;
        free = paid = redeem = 0;
        if (initQty < 0) {
            finQty = initQty + bought;
            if (finQty > 0) {
                free = Math.abs (initQty);
                paid = 0;
            } else {
                free = finQty - initQty;
                paid = 0;
            }
            initQty = 0;
        } else
            finQty = initQty + bought;
        console.log("mid way through math");
        while (finQty > 0) {
            if (finQty < thldQty) {
                paid = paid + finQty;
                break;
            } else {
                paid = paid + thldQty - initQty;
                finQty = finQty - thldQty- freeQty;
                redeem = redeem + freeQty;
                if (finQty > 0)
                    free = free + freeQty;
                else {
                    free = free + (freeQty - Math.abs(finQty));
                }
                initQty = 0;
            }
        }
        result = {
            finQty : finQty,
            free : free,
            paid : paid,
            redeem : redeem
        };
        console.log("returning from math");
        return result;
    }
};
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
        getCustCouponsByCouponId : getCustCouponsByCouponId
    };
    return api;

    function createCustomerCoupon (customerCoupon) {
        console.log("model: creating new entry for customer");
        var deferred = q.defer ();

        var newCoupon, result, msg, rem, x, y, z, freeItems, redeemCount;
        if (customerCoupon.restCoupon.couponType == "QUANTITY") {
            freeItems = Math.floor(parseInt(customerCoupon.currQuantity) / customerCoupon.restCoupon.quantity);
            freeItems = freeItems * customerCoupon.restCoupon.freeQuantity;
            var qty = (parseInt(customerCoupon.currQuantity) % customerCoupon.restCoupon.quantity) - freeItems;

            if (parseInt(customerCoupon.currQuantity) == customerCoupon.restCoupon.quantity) {
                msg = "You have to pay for " + customerCoupon.currQuantity + " items!";
                msg = "You will get free items next time";
                redeemCount = freeItems;
            }
            else if (parseInt(customerCoupon.currQuantity) > customerCoupon.restCoupon.quantity) {
                if (qty > 0) {
                    x = parseInt(customerCoupon.currQuantity) - freeItems;
                    msg = "You have to pay for only " + x + "items. You get " + freeItems + " free!";
                } else {
                    z = Math.abs(qty);
                    y = freeItems - z;
                    x = parseInt(customerCoupon.currQuantity) - y;
                    msg = "You have to pay for " + x + "items, " + "you will get " + y + "items free and have balance for" + z + "items!";
                }
                redeemCount = freeItems;
            } else {
                rem =  customerCoupon.restCoupon.quantity - parseInt(customerCoupon.currQuantity);
                msg = "You have to pay for " + customerCoupon.currQuantity + " items, no coupon applicable right now!";
                msg = msg + " To get free items, buy " + rem + " items more!";
                redeemCount = 0;
            }
            result = {
                msg : msg
            };
            newCoupon = {
                customerId: customerCoupon.customerId,
                restLocuId: customerCoupon.restLocuId,
                couponId: customerCoupon.couponId,
                currQuantity: qty,
                totalQuantity: parseInt(customerCoupon.currQuantity),
                amount: null,
                redeemCount : redeemCount
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

        console.log("model: printing new coupon");
        console.log(newCoupon);
        CustomerCouponModel.create (newCoupon, function (err, entry) {
            if (err) {
                console.log("there was an error");
                console.log(err);
                deferred.reject(err);
            }
            else {
                console.log("model: created an entry for customer");
                console.log(result);
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
                            var freeItems, x, y, z;
                            x = parseInt(customerCoupon.currQuantity);
                            y = 0;

                            coupons[i].currQuantity = coupons[i].currQuantity + x;
                            coupons[i].totalQuantity = coupons[i].totalQuantity + x;

                            if (coupons[i].currQuantity == 0) {
                                msg = "You have overflowing balance, you don't have to pay anything now!";
                                msg = msg + " You have 0 balance now!";
                            }
                            else if ((coupons[i].currQuantity == customerCoupon.restCoupon.quantity)) {
                                msg = "You have to pay for " + x + " items!";
                                msg = "You will get free items next time";
                            }
                            else if (coupons[i].currQuantity > customerCoupon.restCoupon.quantity) {
                                freeItems = Math.floor(coupons[i].currQuantity / customerCoupon.restCoupon.quantity);
                                freeItems = freeItems * customerCoupon.restCoupon.freeQuantity;
                                coupons[i].currQuantity = coupons[i].currQuantity % customerCoupon.restCoupon.quantity;
                                coupons[i].currQuantity = coupons[i].currQuantity - freeItems;
                                coupons[i].redeemCount = coupons[i].redeemCount + freeItems;

                                if (coupons[i].currQuantity > 0) {
                                    x = x - freeItems;
                                    msg = "You have to pay for " + x + "items and get " + freeItems + " free!";
                                } else {
                                    z = Math.abs(coupons[i].currQuantity);
                                    y = freeItems - z;
                                    x = x - y;
                                    msg = "You have to pay for " + x + " items! ";
                                    msg = msg + "You will get " + y + "items free!";
                                    msg = msg + " You have balance for" + z + "items!";
                                }
                            } else if (coupons[i].currQuantity < 0) {
                                x = Math.abs(coupons[i].currQuantity);
                                msg = "You have overflowing balance, you don't have to pay anything now!";
                                msg = msg + "You have balance for " + x + " items";
                            } else if (coupons[i].currQuantity < customerCoupon.restCoupon.quantity) {
                                var rem = customerCoupon.restCoupon.quantity - coupons[i].currQuantity;
                                msg = "You have to pay for " + x + "items, no coupon applicable right now!";
                                msg = msg + " To get free items, buy " + rem + " items more!";
                            }

                            result = {
                                msg : msg
                            };
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
};
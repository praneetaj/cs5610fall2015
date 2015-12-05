var q = require ("q");

module.exports = function (mongoose, db) {
    var RestaurantSchema = require ("./restaurant.schema.js") (mongoose);
    var RestaurantModel = mongoose.model ("RestaurantModel", RestaurantSchema);

    var api = {
        createRestaurant : createRestaurant,
        getRestCouponsByZipcodeOrCity : getRestCouponsByZipcodeOrCity,
        getRestByLocuId : getRestByLocuId,
        addCouponForRest : addCouponForRest,
        removeCouponByLocuIdAndCouponIndex : removeCouponByLocuIdAndCouponIndex,
        getCouponByLocuIdAndCouponIndex : getCouponByLocuIdAndCouponIndex,
        updateCouponByLocuIdAndCouponIndex : updateCouponByLocuIdAndCouponIndex
    };
    return api;

    function createRestaurant (restaurant) {
        var deferred = q.defer ();

        RestaurantModel.create (restaurant, function (err, restaurant) {
            if (err)
                deferred.reject(err);
            else
                deferred.resolve (restaurant);
        });
        return deferred.promise;
    }

    function addCouponForRest (locuId, newCoupon) {
        var deferred = q.defer ();
        console.log(locuId);
        console.log(newCoupon);

        RestaurantModel.findOne ({"restLocuId" : locuId}, function (err, restaurant) {
            if (err)
                deferred.reject(err);
            else {
                restaurant.coupons.push (newCoupon);
                restaurant.save (function (err, restaurant) {
                    deferred.resolve(restaurant);
                });
            }
        });
        return deferred.promise;
    }

    function getRestCouponsByZipcodeOrCity (searchParam) {
        var deferred = q.defer ();

        RestaurantModel.find ({$or : [{"zipcode" : searchParam}, {"city" : searchParam}]}, function (err, response) {
            if (err)
                deferred.reject(err);
            else {
                var result = [];
                for (var i = 0; i < response.length; i++) {
                    for (j = 0; j < response[i].coupons.length; j++) {
                        var newObj = {
                            restLocuId : response[i].restLocuId,
                            name : response[i].name,
                            coupon : response[i].coupons[j]
                        };
                        result.push(newObj);
                    }
                }
                deferred.resolve(result);
            }
        });
        return deferred.promise;
    }

    function getRestByLocuId (locuId) {
        var deferred = q.defer ();

        RestaurantModel.findOne ({"restLocuId" : locuId}, function (err, response) {
            if (err)
                deferred.reject(err);
            else
                deferred.resolve (response);
        });
        return deferred.promise;
    }

    function removeCouponByLocuIdAndCouponIndex (locuId, index) {
        var deferred = q.defer ();

        RestaurantModel.findOne ({"restLocuId" : locuId}, function (err, restaurant) {
            if (err)
                deferred.reject(err);
            else {
                restaurant.coupons.splice (index, 1);
                restaurant.save (function (err, restaurant) {
                    deferred.resolve (restaurant);
                });
            }
        });
        return deferred.promise;
    }

    function getCouponByLocuIdAndCouponIndex (locuId, index) {
        var deferred = q.defer ();

        RestaurantModel.findOne ({"restLocuId" : locuId}, function (err, restaurant) {
            if (err)
                deferred.reject(err);
            else
                deferred.resolve (restaurant.coupons[index]);
        });
        return deferred.promise;
    }

    function updateCouponByLocuIdAndCouponIndex (locuId, index, updatedCoupon) {
        var deferred = q.defer ();

        RestaurantModel.findOne ({"restLocuId" : locuId}, function (err, restaurant) {
            if (err)
                deferred.reject(err);
            else {
                restaurant.coupons[index].label = updatedCoupon.label;
                restaurant.coupons[index].couponType = updatedCoupon.couponType;
                restaurant.coupons[index].description = updatedCoupon.description;
                restaurant.coupons[index].itemName = updatedCoupon.itemName;
                restaurant.coupons[index].quantity = updatedCoupon.quantity;
                restaurant.coupons[index].amount = updatedCoupon.amount;
                restaurant.coupons[index].dateCreated = updatedCoupon.dateCreated;
                restaurant.coupons[index].expiry = updatedCoupon.expiry;
                //restaurant.coupons[index].isValid = updatedCoupon.isValid;
                restaurant.save (function (err, restaurant) {
                    deferred.resolve (restaurant);
                });
            }
        });
        return deferred.promise;
    }
};
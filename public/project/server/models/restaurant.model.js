var q = require ("q");

module.exports = function (mongoose, db) {
    var RestaurantSchema = require ("./restaurant.schema.js") (mongoose);
    var RestaurantModel = mongoose.model ("RestaurantModel", RestaurantSchema);

    var api = {
        getRestCouponsByZipcodeOrCity : getRestCouponsByZipcodeOrCity,
        getRestCouponsByLocuId : getRestCouponsByLocuId
    };
    return api;

    function getRestCouponsByZipcodeOrCity (searchParam) {
        var deferred = q.defer ();

        RestaurantModel.find ({$or : [{"zipcode" : searchParam}, {"city" : searchParam}]}, function (err, response) {
            if (err)
                deferred.reject(err);
            else
                deferred.resolve (response);
        });
        return deferred.promise;
    }

    function getRestCouponsByLocuId (locuId) {
        var deferred = q.defer ();

        RestaurantModel.find ({"restLocuId" : locuId}, function (err, response) {
            if (err)
                deferred.reject(err);
            else
                deferred.resolve (response);
        });
        return deferred.promise;
    }
};
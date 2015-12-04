module.exports = function (mongoose) {

    var RestCouponSchema = mongoose.Schema ({
        label : String,
        couponType : {
            type : String,
            enum : ["QUANTITY", "AMOUNT"]
        },
        description : String,
        itemName : String,
        quantity : String,
        amount : String,
        dateCreated : Date,
        expiry : Date
    });

    var RestSchema = mongoose.Schema({
        restLocuId : String,
        name : String,
        zipcode : String,
        city : String,
        restCoupons : [RestCouponSchema]
    }, {collection : "cs5610.project.restaurant"});

    return RestSchema;
};
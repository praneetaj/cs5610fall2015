module.exports = function (mongoose) {

    var CustCouponSchema = mongoose.schema ({
        restLocuId : String,
        couponId : String,
        itemName : String,
        currQuantity : String,
        totalQuantity : String,
        amount : String
    });

    var CustomerSchema = mongoose.Schema({
        loyalUUsername : String,
        cust_coupons : [CustCouponSchema]
    }, {collection : "cs5610.project.restaurant"});

    return CustomerSchema;
};
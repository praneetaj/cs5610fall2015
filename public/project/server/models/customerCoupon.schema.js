module.exports = function (mongoose) {

    var CustomerSchema = mongoose.Schema({
        customerId : String,
        restLocuId : String,
        couponId : String,
        currQuantity : Number,
        totalQuantity : {
            type : Number,
            default : 0
        },
        amount : Number,
        redeemCount : Number
    }, {collection : "cs5610.project.customerCoupons"});

    return CustomerSchema;
};
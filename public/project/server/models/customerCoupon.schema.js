module.exports = function (mongoose) {

    var CustCouponSchema = mongoose.Schema ({
        restLocuId : String,
        couponId : String,
        //couponLabel : String,
        currQuantity : Number,
        totalQuantity : Number,
        amount : Number
    });

    var CustomerSchema = mongoose.Schema({
        customerId : String,
        restLocuId : String,
        couponId : String,
        //couponLabel : String,
        currQuantity : Number,
        totalQuantity : {
            type : Number,
            default : 0
        },
        amount : Number
    }, {collection : "cs5610.project.customerCoupons"});

    return CustomerSchema;
};
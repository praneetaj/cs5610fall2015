module.exports = function (mongoose) {

    var RestCouponSchema = mongoose.Schema ({
        label : String,
        couponType : {
            type : String,
            enum : ["QUANTITY", "AMOUNT"]
        },
        description : String,
        itemName : String,
        quantity : Number,
        amount : Number,
        discount : Number,
        dateCreated : Date,
        expiry : Date,
        isValid : {
            type : Boolean,
            default : true
        }
    });

    var RestSchema = mongoose.Schema({
        restLocuId : String,
        name : String,
        zipcode : String,
        city : String,
        image_url : String,
        coupons : [RestCouponSchema]
    }, {collection : "cs5610.project.restaurant"});

    return RestSchema;
};
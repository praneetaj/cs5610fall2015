module.exports = function (mongoose) {
    var userSchema = mongoose.Schema({
        loyalUUsername : {
            type : String,
            unique : true
        },
        password : String,
        googleUsername : String, //not sure if google api returns this
        googleId : String,
        email : String,
        role : {
            type : String,
            enum : ["CUSTOMER", "ADMIN"]
        },
        restLocuId : String
    }, {collection : "cs5610.project.user"});

    return userSchema;
};
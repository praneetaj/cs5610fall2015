module.exports = function (mongoose) {
    var userSchema = mongoose.Schema({
        loyalUUsername : {
            type : String,
            unique : true
        },
        password : String,
        googleUsername : String,
        googleId : String,
        email : String,
        role : {
            type : String,
            enum : ["CUSTOMER", "ADMIN"]
        },
        restLocuId : String,
        firstName : String,
        lastName : String
    }, {collection : "cs5610.project.user"});

    return userSchema;
};
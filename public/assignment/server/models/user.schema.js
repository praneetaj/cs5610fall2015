module.exports = function (mongoose) {
    var UserSchema = mongoose.Schema({
        firstName : String,
        lastName : String,
        username : {
            type : String,
            unique : true
        },
        password : String,
        email : String
    }, {collection : "cs5610.assignment.user"});

    return UserSchema;
};
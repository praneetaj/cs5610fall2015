module.exports = function (app, mongoose, db, passport, LocalStrategy) {

    var RestaurantModel = require("./models/restaurant.model.js") (mongoose, db);
    var userModel = require("./models/user.model.js") (mongoose, db, passport, LocalStrategy);
    var customerCouponModel = require("./models/customerCoupon.model.js") (mongoose, db);

    require("./services/user.service.server.js")(app, userModel, passport);
    require("./services/locuApi.service.server.js")(app);
    require("./services/placePhoto.service.server.js") (app);
    require("./services/loyalUCouponService.server.js")(app, RestaurantModel);
    require("./services/restaurant.service.server.js")(app, RestaurantModel);
    require("./services/customerCoupon.service.server.js")(app, customerCouponModel);
};
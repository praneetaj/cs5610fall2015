module.exports = function (app, mongoose, db, passport, LocalStrategy) {

    var RestaurantModel = require("./models/restaurant.model.js") (mongoose, db);
    var userModel = require("./models/user.model.js") (mongoose, db);
    var customerCouponModel = require("./models/customerCoupon.model.js") (mongoose, db);
    //var formModel = require("./models/form.model.js") (mongoose, db);

    require("./services/user.service.server.js")(app, userModel);
    require("./services/locuApi.service.server.js")(app);
    require("./services/loyalUCouponService.server.js")(app, RestaurantModel);
    require("./services/restaurant.service.server.js")(app, RestaurantModel);
    require("./services/customerCoupon.service.server.js")(app, customerCouponModel);
};
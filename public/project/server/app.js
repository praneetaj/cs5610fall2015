module.exports = function (app, mongoose, db) {

    var RestaurantModel = require("./models/restaurant.model.js") (mongoose, db);
    //var formModel = require("./models/form.model.js") (mongoose, db);

    require("./services/locu-api.service.js")(app);
    require("./services/loyalUCouponService.server.js")(app, RestaurantModel);
    //require("./services/form.service.js")(app, formModel);
    //require("./services/field.service.js")(app, formModel);
};
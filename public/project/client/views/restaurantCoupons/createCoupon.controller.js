(function () {
    angular
        .module ("LoyalUApp")
        .controller ("CreateCouponController", CreateCouponController);

    function CreateCouponController (LoyalUCouponService, LocuApiService, $rootScope) {
        var model = this;
        model.createCoupon = createCoupon;
        model.change = change;

        function change () {
            var type = model.newCoupon.couponType;
            model.load = true;
            if (type == "AMOUNT") {
                model.amount = true;
            }
            else {
                model.amount = false;
                initMenu();
            }
        }

        function initMenu () {
            if ($rootScope.loggedInUser) {
                LocuApiService.getLocuDetailsByLocuId ($rootScope.loggedInUser.restLocuId).then(function (response) {
                    console.log(response);
                    var menuItems = LocuApiService.extractMenuFromResponse (response);
                    console.log(menuItems);
                    model.menuItems = menuItems;
                    model.response = response;
                    //console.log(response.body.venues[0].menus[0].sections[0].subsections);
                });
            }
        }

        function createCoupon () {
            if (model.newCoupon.couponType == "AMOUNT") {
                createAmountCoupon ();
            } else if (model.newCoupon.couponType == "QUANTITY") {
                createQuantityCoupon ();
            }
        }

        function clearFields () {
            model.newCoupon.label = "";
            model.newCoupon.description = "";
            model.newCoupon.amount = "";
            model.newCoupon.itemName = "";
            model.newCoupon.quantity = "";
            model.newCoupon.freeQuantity = "";
            model.newCoupon.expiry = "";
            model.newCoupon.discount = "";
        }

        function validAmountEntries () {
            if (typeof model.newCoupon.label == "undefined" ||
                typeof model.newCoupon.description == "undefined" ||
                typeof model.newCoupon.amount == "undefined" ||
                typeof model.newCoupon.discount == "undefined" ||
                typeof model.newCoupon.expiry == "undefined" ||
                model.newCoupon.label == "" ||
                model.newCoupon.description == "" ||
                model.newCoupon.amount == "" ||
                model.newCoupon.discount == "" ||
                model.newCoupon.expiry == "")
                return false;
            else
                return true;
        }

        function validQuantityEntries () {
            if (typeof model.newCoupon.label == "undefined" ||
                typeof model.newCoupon.description == "undefined" ||
                typeof model.newCoupon.itemName == "undefined" ||
                typeof model.newCoupon.quantity == "undefined" ||
                typeof model.newCoupon.freeQuantity == "undefined" ||
                typeof model.newCoupon.expiry == "undefined" ||
                model.newCoupon.label == "" ||
                model.newCoupon.description == "" ||
                model.newCoupon.itemName == "" ||
                model.newCoupon.quantity == "" ||
                model.newCoupon.freeQuantity == "" ||
                model.newCoupon.expiry == "")
                return false;
            else
                return true;
        }

        function createAmountCoupon () {
            if (validAmountEntries()) {
                var newCoupon = {
                    label : model.newCoupon.label,
                    couponType : "AMOUNT",
                    description : model.newCoupon.description,
                    itemName : null,
                    quantity : null,
                    freeQuantity : null,
                    amount : model.newCoupon.amount,
                    discount : model.newCoupon.discount,
                    dateCreated : new Date(),
                    expiry : model.newCoupon.expiry
                };
                console.log(newCoupon);
                LoyalUCouponService.addCouponForRest($rootScope.loggedInUser.restLocuId, newCoupon).then(function (response) {
                    alert("Coupon created successfully!");
                    console.log(response);
                    clearFields();
                });
            } else {
                alert ("Enter Valid Values!");
            }
        }

        function createQuantityCoupon () {
            if (validQuantityEntries()) {
                var newCoupon = {
                    label : model.newCoupon.label,
                    couponType : "QUANTITY",
                    description : model.newCoupon.description,
                    itemName : model.newCoupon.itemName,
                    quantity : model.newCoupon.quantity,
                    freeQuantity : model.newCoupon.freeQuantity,
                    amount : null,
                    discount : null,
                    dateCreated : new Date(),
                    expiry : model.newCoupon.expiry
                };
                console.log(newCoupon);
                LoyalUCouponService.addCouponForRest($rootScope.loggedInUser.restLocuId, newCoupon).then(function (response) {
                    alert("Coupon created successfully!");
                    console.log(response);
                    clearFields();
                });
            } else {
                alert ("Enter Valid Values!");
            }
        }
    }
}) ();
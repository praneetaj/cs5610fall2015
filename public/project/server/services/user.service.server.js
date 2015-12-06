module.exports = function (app, model, passport) {
    app.post("/api/project/login", passport.authenticate('local'), findUserByCredentials);
    app.post("/api/project/logout", logout);
    app.post("/api/project/user", createUser);
    app.get("/api/project/user", findUser);
    app.get("/api/project/customer", findAllCustomers);
    app.get("/api/project/user/:userId", findUserById);
    app.put("/api/project/user/:userId", updateUser);
    app.delete("/api/project/user/:userId", deleteUser);
    app.get('/api/project/loggedin', getLoggedIn);

    var auth = function(req, res, next)
    {
        if (!req.isAuthenticated())
            res.send(401);
        else
            next();
    };

    function getLoggedIn (req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function findUserByCredentials (req, res) {
        var credentials = {
            username : req.body.loyalUUsername,
            password : req.body.password
        };
        model
            .findUserByCredentials (credentials)
            .then (function (user) {
                res.json (user);
            });
    }

    function logout (req, res) {
        console.log("logging out");
        req.logOut();
        res.send(200);
    }

    function createUser (req, res) {
        model
            .createUser (req.body)
            .then (function (user) {
                res.json (user);
            });
    }

    function findUser (req, res) {
        var username = req.query.username;
        var password = req.query.password;

        if (typeof username == "undefined" && typeof password == "undefined") {
            model
                .findAllUsers ()
                .then (function (users) {
                res.json (users);
            });
        } else if (typeof username != "undefined") {
            if (typeof password == "undefined") {
                model
                    .findUserByUsername (username)
                    .then (function (user) {
                        console.log(user);
                        res.json (user);
                    });
            } else {
                var credentials = {
                    "username" : username,
                    "password" : password
                };
                model
                    .findUserByCredentials (credentials)
                    .then (function (user) {
                    res.json (user);
                });
            }
        }
    }

    function findAllCustomers (req, res) {
        console.log("find all customers");
        model
            .findAllCustomers ()
            .then (function (user) {
                console.log(user);
                res.json (user);
            });
    }


    function updateUser (req, res) {
        var id = req.params.userId;
        var updatedUser = req.body;
        model
            .updateUser (id, updatedUser)
            .then (function (user) {
            res.json (user);
        });
    }

    function findUserById (req, res) {
        model
            .findUserById (req.params.id)
            .then (function (user) {
            res.json (user);
        });
    }

    function deleteUser (req, res) {
        model
            .deleteUser (req.params.id)
            .then (function (status) {
            res.json (status);
        });
    }
};
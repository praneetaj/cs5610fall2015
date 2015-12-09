module.exports = function (app, model, passport) {
    var auth = function(req, res, next)
    {
        if (!req.isAuthenticated())
            res.send(401);
        else
            next();
    };

    app.post("/api/project/login", passport.authenticate('local'), findUserByCredentials);
    app.post("/api/project/logout", logout);
    app.post("/api/project/user", createUser);
    app.get("/api/project/user", auth, findUser);
    app.get("/api/project/customer", auth, findAllCustomers);
    app.get("/api/project/user/:userId", auth, findUserById);
    app.put("/api/project/user/:userId", auth, updateUser);
    app.put("/api/project/user/:userId/password", auth, updatePassword);
    app.delete("/api/project/user/:userId", auth, deleteUser);
    app.get('/api/project/loggedin', getLoggedIn);

    function getLoggedIn (req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function updatePassword (req, res) {
        model
            .updatePassword (req.params.userId, req.body)
            .then (function (user) {
                res.json (user);
            });
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
                console.log("created user");
                console.log(user);
                req.login(user, function(err)
                {
                    if(err) {
                        console.log("error in login");
                        return next(err);
                    }
                    console.log("logged in");
                    console.log(user);
                    res.json(user);
                });
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
        console.log("updating only user");
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
            .deleteUser (req.params.userId)
            .then (function (status) {
                res.json (status);
            });
    }
};
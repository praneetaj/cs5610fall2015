module.exports = function(app) {
      var users = [
          {first: "Alice", last: "Wonderland", username: "alice", email: "alice@wonderland.com"},
          {first: "Praneeta", last: "Jhanwar", username: "praneeta", email: "praneeta@gmail.com"},
          {first: "Bharat", last: "Kandoi", username: "bharat", email: "bharat@gmail.com"},
          {first: "Bob", last: "Marley", username: "bob", email: "bob@gmail.com"}
      ];

    app.get('/api/user', function (req, res) {
        res.json(users);
    });

    app.get('/api/user/:id', function (req, res) {
        var index = req.params.id;
        res.json(users[index]);
    });

    app.delete('/api/user/:id', function (req, res) {
        var index = req.params.id;
        users.splice(index, 1);
        res.json(users);
    });

    app.post('/api/user', function (req, res) {
        var nuser = req.body;
        users.push(nuser);
        res.json(users);
    });

    app.put('/api/user/:id', function (req, res) {
        users[req.params.id] = req.body;
        res.json(users);
    });
};
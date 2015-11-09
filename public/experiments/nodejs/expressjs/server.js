var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/hello', sayHello);
app.get('/json', function (req, res) {
    var course = {
        title : 'Java 101',
        seats : 23,
        start : new Date()
    };
    res.json(course);
});

var courses = [
    {title : 'Java 101', seats : 12, start : new Date()},
    {title : 'C# 101', seats : 12, start : new Date()},
    {title : 'ASP.NET 101', seats : 12, start : new Date()},
    {title : 'Node.js 101', seats : 12, start : new Date()},
    {title : 'AngularJS 101', seats : 12, start : new Date()}
];

app.get('/api/course', function(req, res) {
    res.json(courses);
});

app.get('/api/course/:id', function(req, res) {
    var index = req.params.id;
    console.log(index);
    res.json(courses[index]);
});

app.delete('/api/course/:id', function(req, res) {
    var index = req.params.id;
    courses.splice(index, 1);
    res.json(courses);
});

app.post('/api/course', function (req, res) {
    var newCourse = req.body;
    console.log(newCourse);
    courses.push(newCourse);
    res.json(courses);
})

function sayHello(req, res) {
    console.log('Say Hello');
    res.send('<h1>Say Hello</h1>');
}

app.put('/api/course/:id', function(req, res) {
    var index = req.params.id;
    courses[index] = req.body;
    res.json(courses);
});

app.listen(3000);

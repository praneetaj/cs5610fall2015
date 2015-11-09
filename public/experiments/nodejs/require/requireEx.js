var otherFile = require('./otherFile.js');

console.log('Hello from require example');

console.log(otherFile);
console.log(otherFile.a + otherFile.b);
console.log(otherFile.add(123, 234));

var square = require('./square.js');
var s1 = square("s1", 12, 23);
var s2 = square("s2", 13, 33);

s1.setName('s11');
s1.setWidth(111);
console.log(s1);
console.log(s1.getName());
console.log(s1.getWidth());

s2.setName('s22');
console.log(s2.getName());

var ma = require('./math');
var ma1 = ma();
console.log(ma1.add(12, 23));


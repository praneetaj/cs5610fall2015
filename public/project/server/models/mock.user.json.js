
/** cs5610.project.user indexes **/
db.getCollection("cs5610.project.user").ensureIndex({
  "_id": NumberInt(1)
},[
  
]);

/** cs5610.project.user indexes **/
db.getCollection("cs5610.project.user").ensureIndex({
  "loyalUUsername": NumberInt(1)
},{
  "unique": true
});

/** cs5610.project.user records **/
db.getCollection("cs5610.project.user").insert({
  "loyalUUsername": "raj",
  "password": "raj",
  "googleUsername": null,
  "googleId": null,
  "email": "",
  "role": "ADMIN",
  "restLocuId": "aac0db63a3de5971f5b3",
  "firstName": "",
  "lastName": "",
  "_id": ObjectId("5667cceb7dbd8daf0e89bb6e"),
  "__v": NumberInt(0)
});
db.getCollection("cs5610.project.user").insert({
  "loyalUUsername": "tom",
  "password": "tom",
  "googleUsername": null,
  "googleId": null,
  "email": "",
  "role": "ADMIN",
  "restLocuId": "d135ecfa36b8c99533fe",
  "firstName": "",
  "lastName": "",
  "_id": ObjectId("5667cee67dbd8daf0e89bb71"),
  "__v": NumberInt(0)
});
db.getCollection("cs5610.project.user").insert({
  "__v": NumberInt(0),
  "_id": ObjectId("5667f937d1baac87a5b7842c"),
  "email": "divya.dvrj@gmail.com",
  "firstName": "Divya",
  "googleId": null,
  "googleUsername": null,
  "lastName": "Devaraj",
  "loyalUUsername": "divya",
  "password": "dd",
  "restLocuId": null,
  "role": "CUSTOMER"
});
db.getCollection("cs5610.project.user").insert({
  "__v": NumberInt(0),
  "_id": ObjectId("566809b7d1baac87a5b7842e"),
  "email": "test@gmail.com",
  "firstName": "Test",
  "googleId": null,
  "googleUsername": null,
  "lastName": "Client",
  "loyalUUsername": "test",
  "password": "test",
  "restLocuId": "d841612ea20ec3a3d453",
  "role": "ADMIN"
});
db.getCollection("cs5610.project.user").insert({
  "__v": NumberInt(0),
  "_id": ObjectId("5669df66183e9d8863c781c4"),
  "email": "divya.dvrj@gmail.com",
  "firstName": "Divya",
  "googleId": null,
  "googleUsername": null,
  "lastName": "Devaraj",
  "loyalUUsername": "dd",
  "password": "dd",
  "restLocuId": null,
  "role": "CUSTOMER"
});
db.getCollection("cs5610.project.user").insert({
  "loyalUUsername": "christy",
  "password": "christy",
  "googleUsername": null,
  "googleId": null,
  "email": "",
  "role": "ADMIN",
  "restLocuId": "c2084a4b451d7d8ba33c",
  "firstName": "",
  "lastName": "",
  "_id": ObjectId("566abfe2183e9d8863c781c7"),
  "__v": NumberInt(0)
});
db.getCollection("cs5610.project.user").insert({
  "loyalUUsername": "sindy",
  "password": "sindy",
  "googleUsername": null,
  "googleId": null,
  "email": "",
  "role": "ADMIN",
  "restLocuId": "dae1db1527ee606c7cc2",
  "firstName": "",
  "lastName": "",
  "_id": ObjectId("566ac09f183e9d8863c781cb"),
  "__v": NumberInt(0)
});
db.getCollection("cs5610.project.user").insert({
  "__v": NumberInt(0),
  "_id": ObjectId("566e8e5aace161c8249e4a17"),
  "email": "rick@gmail.com",
  "firstName": "Rick",
  "googleId": null,
  "googleUsername": null,
  "lastName": "Zymes",
  "loyalUUsername": "rick",
  "password": "rick",
  "restLocuId": null,
  "role": "CUSTOMER"
});
db.getCollection("cs5610.project.user").insert({
  "__v": NumberInt(0),
  "_id": ObjectId("5667c9fa7dbd8daf0e89bb6a"),
  "email": "tim@gmail.com",
  "firstName": "Tim",
  "googleId": null,
  "googleUsername": null,
  "lastName": "Cowley",
  "loyalUUsername": "tim",
  "password": "tim",
  "restLocuId": "1226871254f952b60272",
  "role": "ADMIN"
});
db.getCollection("cs5610.project.user").insert({
  "__v": NumberInt(0),
  "_id": ObjectId("5667cfaa7dbd8daf0e89bb74"),
  "email": "ruth@gmail.com",
  "firstName": "Ruth",
  "googleId": null,
  "googleUsername": null,
  "lastName": "Hathaway",
  "loyalUUsername": "ruth",
  "password": "ruth",
  "restLocuId": "1a6ad935349010a3b32b",
  "role": "ADMIN"
});
db.getCollection("cs5610.project.user").insert({
  "__v": NumberInt(0),
  "_id": ObjectId("5667f39464932451087823c9"),
  "email": "alice@wonderland.com",
  "firstName": "Alice",
  "googleId": null,
  "googleUsername": null,
  "lastName": "Wonderland",
  "loyalUUsername": "alice",
  "password": "alice",
  "restLocuId": null,
  "role": "CUSTOMER"
});

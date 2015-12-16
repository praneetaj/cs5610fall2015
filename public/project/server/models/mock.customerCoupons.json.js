
/** cs5610.project.customerCoupons indexes **/
db.getCollection("cs5610.project.customerCoupons").ensureIndex({
  "_id": NumberInt(1)
},[
  
]);

/** cs5610.project.customerCoupons records **/
db.getCollection("cs5610.project.customerCoupons").insert({
  "customerId": "5667f937d1baac87a5b7842c",
  "restLocuId": "1a6ad935349010a3b32b",
  "couponId": "5667cff67dbd8daf0e89bb75",
  "currQuantity": NumberInt(1),
  "amount": null,
  "redeemCount": NumberInt(2),
  "_id": ObjectId("566e8d93ace161c8249e4a13"),
  "totalQuantity": NumberInt(11),
  "__v": NumberInt(0)
});
db.getCollection("cs5610.project.customerCoupons").insert({
  "customerId": "5667f39464932451087823c9",
  "restLocuId": "1a6ad935349010a3b32b",
  "couponId": "5667d03a7dbd8daf0e89bb76",
  "currQuantity": null,
  "amount": NumberInt(50),
  "redeemCount": NumberInt(1),
  "_id": ObjectId("566e8da2ace161c8249e4a14"),
  "totalQuantity": null,
  "__v": NumberInt(0)
});
db.getCollection("cs5610.project.customerCoupons").insert({
  "customerId": "5667f39464932451087823c9",
  "restLocuId": "1a6ad935349010a3b32b",
  "couponId": "566e8dedace161c8249e4a15",
  "currQuantity": NumberInt(4),
  "amount": null,
  "redeemCount": NumberInt(6),
  "_id": ObjectId("566e8e01ace161c8249e4a16"),
  "totalQuantity": NumberInt(40),
  "__v": NumberInt(0)
});
db.getCollection("cs5610.project.customerCoupons").insert({
  "customerId": "566e8e5aace161c8249e4a17",
  "restLocuId": "1226871254f952b60272",
  "couponId": "5667cafc7dbd8daf0e89bb6b",
  "currQuantity": NumberInt(2),
  "amount": null,
  "redeemCount": NumberInt(2),
  "_id": ObjectId("566e8ec3ace161c8249e4a18"),
  "totalQuantity": NumberInt(14),
  "__v": NumberInt(0)
});
db.getCollection("cs5610.project.customerCoupons").insert({
  "customerId": "5667f937d1baac87a5b7842c",
  "restLocuId": "1226871254f952b60272",
  "couponId": "5667cc7a7dbd8daf0e89bb6c",
  "currQuantity": null,
  "amount": NumberInt(75),
  "redeemCount": NumberInt(1),
  "_id": ObjectId("566e8edcace161c8249e4a19"),
  "totalQuantity": null,
  "__v": NumberInt(0)
});
db.getCollection("cs5610.project.customerCoupons").insert({
  "customerId": "5669df66183e9d8863c781c4",
  "restLocuId": "1a6ad935349010a3b32b",
  "couponId": "5667d03a7dbd8daf0e89bb76",
  "currQuantity": null,
  "amount": NumberInt(10),
  "redeemCount": NumberInt(0),
  "_id": ObjectId("566fdad6f97a4662190892e0"),
  "totalQuantity": null,
  "__v": NumberInt(0)
});

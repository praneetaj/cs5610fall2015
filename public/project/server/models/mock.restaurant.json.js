
/** cs5610.project.restaurant indexes **/
db.getCollection("cs5610.project.restaurant").ensureIndex({
  "_id": NumberInt(1)
},[
  
]);

/** cs5610.project.restaurant records **/
db.getCollection("cs5610.project.restaurant").insert({
  "__v": NumberInt(2),
  "_id": ObjectId("5667c9fa7dbd8daf0e89bb69"),
  "city": "Seattle",
  "coupons": [
    {
      "_id": ObjectId("5667cafc7dbd8daf0e89bb6b"),
      "amount": null,
      "couponType": "QUANTITY",
      "dateCreated": ISODate("2015-12-09T06:32:29.613Z"),
      "description": "Every 6th dogstick free",
      "discount": null,
      "expiry": ISODate("2016-01-31T08:00:00.0Z"),
      "freeQuantity": NumberInt(1),
      "isValid": true,
      "itemName": "Dogsticks",
      "label": "Dogstick Lover",
      "quantity": NumberInt(5)
    },
    {
      "label": "V.I.P Eater",
      "couponType": "AMOUNT",
      "description": "Get 5% off $30",
      "itemName": null,
      "quantity": null,
      "freeQuantity": null,
      "amount": NumberInt(30),
      "discount": NumberInt(5),
      "dateCreated": ISODate("2015-12-09T06:38:50.841Z"),
      "expiry": ISODate("2016-02-05T08:00:00.0Z"),
      "_id": ObjectId("5667cc7a7dbd8daf0e89bb6c"),
      "isValid": true
    }
  ],
  "image_url": "https://lh5.googleusercontent.com/-WXZVPUv5cR8/T5lf68NLoRI/AAAAAAAAAxM/rXND_BbzIco/s1600-w400/",
  "name": "Lunchbox Laboratory",
  "restLocuId": "1226871254f952b60272",
  "zipcode": "98109"
});
db.getCollection("cs5610.project.restaurant").insert({
  "__v": NumberInt(1),
  "_id": ObjectId("5667cceb7dbd8daf0e89bb6d"),
  "city": "Bellevue",
  "coupons": [
    {
      "_id": ObjectId("5667cd307dbd8daf0e89bb6f"),
      "amount": NumberInt(40),
      "couponType": "AMOUNT",
      "dateCreated": ISODate("2015-12-09T06:41:53.155Z"),
      "description": "Get 10% off $40",
      "discount": NumberInt(10),
      "expiry": ISODate("2016-02-20T08:00:00.0Z"),
      "freeQuantity": null,
      "isValid": true,
      "itemName": null,
      "label": "Spicy Joy",
      "quantity": null
    }
  ],
  "image_url": "https://lh3.googleusercontent.com/-42hIPTzGApY/VT-7cp0Dl-I/AAAAAAAAABk/uoSPgn2IZKg/s1600-w400/",
  "name": "Moksha Indian Cuisine",
  "restLocuId": "aac0db63a3de5971f5b3",
  "zipcode": "98004"
});
db.getCollection("cs5610.project.restaurant").insert({
  "__v": NumberInt(1),
  "_id": ObjectId("5667cee67dbd8daf0e89bb70"),
  "city": "Boston",
  "coupons": [
    {
      "label": "Thai Storm",
      "couponType": "AMOUNT",
      "description": "Get 15% off 30",
      "itemName": null,
      "quantity": null,
      "freeQuantity": null,
      "amount": NumberInt(30),
      "discount": NumberInt(15),
      "dateCreated": ISODate("2015-12-09T06:51:15.108Z"),
      "expiry": ISODate("2016-02-19T08:00:00.0Z"),
      "_id": ObjectId("5667cf627dbd8daf0e89bb72"),
      "isValid": true
    }
  ],
  "image_url": "https://lh4.googleusercontent.com/-ZHEbWTruenU/UcpJsWIyIAI/AAAAAAAAVuo/NR-RrNIPfYQ/s1600-w400/",
  "name": "Pad Thai Cafe",
  "restLocuId": "d135ecfa36b8c99533fe",
  "zipcode": "02215"
});
db.getCollection("cs5610.project.restaurant").insert({
  "restLocuId": "d841612ea20ec3a3d453",
  "name": "Starbucks",
  "zipcode": "98126",
  "city": "Seattle",
  "image_url": "https://lh5.googleusercontent.com/-xO59rDiiW64/VX7jQAQHfEI/AAAAAAAATmI/FUYrziKseo0/s1600-w400/",
  "_id": ObjectId("566809b7d1baac87a5b7842d"),
  "coupons": [
    
  ],
  "__v": NumberInt(0)
});
db.getCollection("cs5610.project.restaurant").insert({
  "restLocuId": "598dbe4ff4f911df67cb",
  "name": "Mamma Maria",
  "zipcode": "02113",
  "city": "Boston",
  "image_url": "https://lh6.googleusercontent.com/-znduWA5leXU/UrG0MkJfYBI/AAAAAAAEAYo/PL-6D9qvYwU/s1600-w300-h250/",
  "_id": ObjectId("566abf2b183e9d8863c781c6"),
  "coupons": [
    
  ],
  "__v": NumberInt(0)
});
db.getCollection("cs5610.project.restaurant").insert({
  "__v": NumberInt(2),
  "_id": ObjectId("566abfe3183e9d8863c781c8"),
  "city": "Boston",
  "coupons": [
    {
      "label": "Burger Bonanza",
      "couponType": "QUANTITY",
      "description": "Buy 10 burgers, get 1 free",
      "itemName": "Burger",
      "quantity": NumberInt(10),
      "freeQuantity": NumberInt(1),
      "amount": null,
      "discount": null,
      "dateCreated": ISODate("2015-12-11T12:22:28.76Z"),
      "expiry": ISODate("2015-12-31T08:00:00.0Z"),
      "_id": ObjectId("566ac00d183e9d8863c781c9"),
      "isValid": true
    },
    {
      "label": "Toro fan",
      "couponType": "AMOUNT",
      "description": "Spend 100, get 10% off",
      "itemName": null,
      "quantity": null,
      "freeQuantity": null,
      "amount": NumberInt(100),
      "discount": NumberInt(10),
      "dateCreated": ISODate("2015-12-11T12:23:17.417Z"),
      "expiry": ISODate("2016-01-31T08:00:00.0Z"),
      "_id": ObjectId("566ac03e183e9d8863c781ca"),
      "isValid": true
    }
  ],
  "image_url": "https://lh6.googleusercontent.com/-BsJYoWRAKEo/UcNeMTc7BUI/AAAAAAAD9s8/0u59I7PVVf4/s1600-w300-h250/",
  "name": "Toro",
  "restLocuId": "c2084a4b451d7d8ba33c",
  "zipcode": "02118"
});
db.getCollection("cs5610.project.restaurant").insert({
  "__v": NumberInt(2),
  "_id": ObjectId("566ac0a0183e9d8863c781cc"),
  "city": "Boston",
  "coupons": [
    {
      "label": "Crab Ravioli Fan",
      "couponType": "QUANTITY",
      "description": "Buy 8 ravioli, get 1 free",
      "itemName": "Maine Crab Ravioli w/ Rock Crab, Thyme & Tomato Broth",
      "quantity": NumberInt(8),
      "freeQuantity": NumberInt(1),
      "amount": null,
      "discount": null,
      "dateCreated": ISODate("2015-12-11T12:27:07.987Z"),
      "expiry": ISODate("2016-01-10T08:00:00.0Z"),
      "_id": ObjectId("566ac125183e9d8863c781cd"),
      "isValid": true
    },
    {
      "label": "Platinum Member",
      "couponType": "AMOUNT",
      "description": "Spend 200, get 20% off",
      "itemName": null,
      "quantity": null,
      "freeQuantity": null,
      "amount": NumberInt(200),
      "discount": NumberInt(20),
      "dateCreated": ISODate("2015-12-11T12:28:34.643Z"),
      "expiry": ISODate("2017-12-31T08:00:00.0Z"),
      "_id": ObjectId("566ac17b183e9d8863c781ce"),
      "isValid": true
    }
  ],
  "image_url": "https://lh5.googleusercontent.com/-rqcFxxtEgnw/T8jJrKdy9wI/AAAAAAAAAa4/H_Nsk5k6sqM/s1600-w300-h250/",
  "name": "Mistral Restaurant",
  "restLocuId": "dae1db1527ee606c7cc2",
  "zipcode": "02116"
});
db.getCollection("cs5610.project.restaurant").insert({
  "__v": NumberInt(3),
  "_id": ObjectId("5667cfa97dbd8daf0e89bb73"),
  "city": "Boston",
  "coupons": [
    {
      "label": "Salad Paradise",
      "couponType": "QUANTITY",
      "description": "Every 5th Salad is free",
      "itemName": "Simple Salad",
      "quantity": NumberInt(4),
      "freeQuantity": NumberInt(1),
      "amount": null,
      "discount": null,
      "dateCreated": ISODate("2015-12-09T06:53:43.17Z"),
      "expiry": ISODate("2016-03-11T08:00:00.0Z"),
      "_id": ObjectId("5667cff67dbd8daf0e89bb75"),
      "isValid": true
    },
    {
      "label": "Premium Club",
      "couponType": "AMOUNT",
      "description": "Get 20$ off 50",
      "itemName": null,
      "quantity": null,
      "freeQuantity": null,
      "amount": NumberInt(50),
      "discount": NumberInt(20),
      "dateCreated": ISODate("2015-12-09T06:54:50.812Z"),
      "expiry": ISODate("2016-02-13T08:00:00.0Z"),
      "_id": ObjectId("5667d03a7dbd8daf0e89bb76"),
      "isValid": true
    },
    {
      "label": "Drinkers Club",
      "couponType": "QUANTITY",
      "description": "Buy 10 drinks, get 2 free",
      "itemName": "Pate De Campagne",
      "quantity": NumberInt(10),
      "freeQuantity": NumberInt(2),
      "amount": null,
      "discount": null,
      "dateCreated": ISODate("2015-12-14T09:37:48.755Z"),
      "expiry": ISODate("2016-01-27T08:00:00.0Z"),
      "_id": ObjectId("566e8dedace161c8249e4a15"),
      "isValid": true
    }
  ],
  "image_url": "https://lh4.googleusercontent.com/-rDuGyXZsE3o/Uoun_pZ2s7I/AAAAAAADzJU/Tp697NbGfXw/s1600-w400/",
  "name": "The Salty Pig",
  "restLocuId": "1a6ad935349010a3b32b",
  "zipcode": "02116"
});

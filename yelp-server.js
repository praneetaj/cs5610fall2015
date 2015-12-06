var Yelp = require('yelp');

var yelp = new Yelp({
    consumer_key: 'rTq2HKo453Uuj_v89MmiCw',
    consumer_secret: 'nJMo2RwM38Etd6CWZ0puCtsn4Tw',
    token: 'IHM3PVbzJwzwM6s5Ex4jf6Jbwa99PwOl',
    token_secret: 'yHddSFKpfJO4p8cXA4bkodkh0Q8',
});


//yelp.search({ term: 'lunchbox laboratory', category_filter : 'food', location: 'Seattle' })
//    .then(function (data) {
//        console.log(data);
//    })
//    .catch(function (err) {
//        console.error(err);
//    });

yelp.business('starbucks-seattle')
    .then(console.log)
    .catch(console.error);
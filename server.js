var request = require('request');

var url = 'http://www2.hawaii.edu/~jstupple';
var foo = request(url, function(err, resp, body) {
    console.log(body);
});

console.log(foo);

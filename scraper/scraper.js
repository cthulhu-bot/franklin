var http = require("http");
var cheerio = require("cheerio");
var request = require("request");

var url = "http://www.gnc.com/GNC-Pro-Performance-AMP-Amplified-Wheybolic-Extreme-60-Chocolate/product.jsp?productId=3509954";

request(url, function(err, resp, body){
    $ = cheerio.load(body);
    links = $('a');
    $(links).each(function(i,link) {
        console.log($(link).text() + ':\n ' + $(link).attr('href'));
    });
});

exports.downloadImage = function(url) {
}

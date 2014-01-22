var http = require("http");
var cheerio = require("cheerio");
var request = require("request");

var gnc = "http://www.gnc.com/home/index.jsp";
var url = "http://www.gnc.com/Sports-Nutrition-Protein-Whey-Protein/family.jsp?categoryId=2108294&cp=3593187";

//exports.productListingLinks = request(url, function(err, resp, body) {
request(url, function(err, resp, body) {
    $ = cheerio.load(body);
    links = $('li.productListing');

//    console.log($(links)[0].text());

    $(links).each(function(i,link) {
        $ = cheerio.load($(this));
        var a = $('dt');
        console.log(a.text());
    });

//    $(links).each(function(i,link) {
//        console.log("---------------------------------------------------------");
//        console.log($(link).text() + ':\n ' + $(link).attr('href'));
//    });
});

exports.productTitles = request(url, function(err, resp, body) {
    $ = cheerio.load(body);
    links = $('li.productListing');

    $(links).each(function(i,link) {
        $ = cheerio.load($(this));
        var a = $('dt');
        console.log(a.text());
    });
});

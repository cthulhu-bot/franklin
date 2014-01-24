var http = require("http");
var cheerio = require("cheerio");
var request = require("request");

var url = "http://www.gnc.com/GNC-Pro-Performance-AMP-Amplified-Wheybolic-Extreme-60-Chocolate/product.jsp?productId=3509954";

request(url, function(err, resp, body){
    $ = cheerio.load(body);
//    product = $('a').text();
    var productImageLink = $('#mainProductImage').attr('src');
    console.log('Image Link\n' + productImageLink);
    var priceNow = $('.priceNow');
    var promoPrice = $('.promo goldCard member-price');
    nutritionInfo = $('.prodTabContentBlockInside');
    // Nutrition info is constructed in an html table
    // Figure out how to deal with this
    $(nutritionInfo).each(function(entry) {
        console.log(entry.text());
    });
});


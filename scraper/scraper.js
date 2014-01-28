var http = require("http");
var cheerio = require('cheerio');
var request = require('request');
var downloader = require('../download');

var url = "http://www.gnc.com/GNC-Pro-Performance-AMP-Amplified-Wheybolic-Extreme-60-Chocolate/product.jsp?productId=3509954";

request(url, function(err, resp, body){
    $ = cheerio.load(body);
//    product = $('a').text();
    var productImageLink = $('#mainProductImage').attr('src');
    console.log('Image Link:\n' + productImageLink);
    var priceNow = $('.priceNow');
    var promoPrice = $('.promo goldCard member-price');
    var nutritionInfo = $('.prodTabContentBlockInside');
    var nutritionTable = $('table');

    var nutritionText = nutritionTable.text();
    var nutritionTrimmedText = nutritionText.replace(/\s+/g, ' ');

    var innerTable = $('table tr td table');
    var innerTableRows = $('table tr td table tr td');
    // Nutrition info is constructed in an html table
    // Figure out how to deal with this
//    $(nutritionTable).each(function(entry) {
//        console.log(entry);
//    });
//    console.log(nutritionInfoRow.text());

    $('table tr').each(function(row) {
//        if (row.text().trim().length) {
//            console.log(row.text());
//        }
    });

//    if($('table tr').contains('Calories')) {
//        console.log('Hello there calories');
//    }

//    console.log(innerTableRows[1]);

//    console.log(nutritionTrimmedText.replace(/%/g,'%\n'));

//    console.log(nutritionTrimmedText.split('%'));
//    var nutritionMap = nutritionTrimmedText.split('%');

//    nutritionTrimmedText.split('%').each(function(text) {
//        console.log(text);
//    });
    console.log('scraper writing to file');

    downloader.writeToFile(nutritionTrimmedText.replace(/%/g,'%<br>'), './public/testProduct.html');

/*    downloader.writeToFile(nutritionTrimmedText.split('%').map(
        function(text) {
            return text.replace('%','%<br>');
        }), '../public/testProduct.html');
*/
});

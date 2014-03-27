var http = require("http");
var cheerio = require("cheerio");
var request = require("request");
var downloader = require('../download');

var gnc = "http://www.gnc.com/home/index.jsp";
// var url = "http://www.gnc.com/Sports-Nutrition-Protein-Whey-Protein/family.jsp?categoryId=2108294&cp=3593187";
var url = 'http://www.gnc.com/Sports-Nutrition-Protein-Whey-Protein/family.jsp?categoryId=2108294&cp=3593187&ppg=64';
var gncHeader = 'http://www.gnc.com';

//exports.productListingLinks = request(url, function(err, resp, body) {
request(url, function(err, resp, body) {
    $ = cheerio.load(body);
    links = $('li.productListing');
    var products = [];

    $(links).each(function(i,link) {
        $ = cheerio.load($(this));
        var productLink = $('a').attr('href');
//        downloader.appendToFile(gncHeader + productLink + '<br>\n', '../public/gncProducts.html');
        products.push(gncHeader + productLink + '<br>\n');
    });


    // This shit is only going to work for the first gnc page with 64 items on it
    $ = cheerio.load(body);
    var pages = [];
    pages[1] = $('li.item-count').next().next().children().attr('href');
    pages[2] = $('li.item-count').next().next().next().children().attr('href');
    pages[3] = $('li.item-count').next().next().next().next().children().attr('href');

    console.log($('li.item-count').next().next().children().attr('href'));
    var nextPage = gncHeader + pages[1];

    request(nextPage, function(err, resp, body) {
//        console.log(nextPage);
        $ = cheerio.load(body);
        links = $('li.productListing');
        var products = [];

        $(links).each(function(i,link) {
            $ = cheerio.load($(this));
            var productLink = $('a').attr('href');
//        downloader.appendToFile(gncHeader + productLink + '<br>\n', '../public/gncProducts.html');
            products.push(gncHeader + productLink + '<br>\n');
        });
    });

    var i = 1;
    products.forEach(function(productLink){
//        console.log(i + ': ' + productLink);
        i++;
//        downloader.writeToFile(gncHeader + productLink + '<br>\n', '../public/gncProducts.html');
    });

    // Iterate over remaining pages but wait 10 seconds before scraping the next page
/*
    pages.forEach(function(url){
        setTimeout(function(){
            products = getProductLinks(gncHeader + url);
            products.forEach(function(productLink){
                console.log(i + ': ' + productLink);
                i++;
//                downloader.writeToFile(gncHeader + productLink + '<br>\n', '../public/gncProducts.html');
            });
        },10000);
    });
*/
});

/* 
**    Given a product list page scrape the individual product urls
*/
var getProductLinks = function(url) {
    var prods = [];
    request(url, function(err, resp, body) {
        $ = cheerio.load(body);
        links = $('li.productListing');

        $(links).each(function(i,link) {
            $ = cheerio.load($(this));
            var productLink = $('a').attr('href');
            var relativeLink = $('a').attr('rel');
            prods.push(gncHeader + productLink + '<br>\n');
        });
    });
    return prods;
}

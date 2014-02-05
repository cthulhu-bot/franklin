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
    var products;

    $(links).each(function(i,link) {
        $ = cheerio.load($(this));
        var productLink = $('a').attr('href');
        var relativeLink = $('a').attr('rel');
        products += (gncHeader + productLink + '<br>');
    });

    $ = cheerio.load(body);
    var pages = [];
    var pagelink = $('li.item-count').next().next().children().attr('href');
    pages[0] = pagelink;    
    pagelink = $('li.item-count').next().next().children().attr('href');
    pages[1] = pagelink;
    pagelink = $('li.item-count').next().next().children().attr('href');
    pages[2] = pagelink;
    pagelink = $('li.item-count').next().next().children().attr('href');
    pages[3] = pagelink;

    var productLinks = [];
    pages.forEach(function(url) {
        // Wait for 4 seconds before scraping the next page
        productLinks = setInterval(function(){getProductLinks(url)},4000);
        console.log(gncHeader + productLinks);
    });

    
//    console.log('gnc crawler writing to file');
//    downloader.writeToFile(products, './public/gncProducts.html');

});

// Given a product list page scrape the individual product urls
function getProductLinks(url) {
    console.log('getProductLinks()');
    console.log('url:  ' + url);
    var productLinks = [];
    request(url, function(err, resp, body) {
        $ = cheerio.load(body);
        links = $('li.productListing');

        $(links).each(function(i,link) {
            $ = cheerio.load($(this));
            var productLink = $('a').attr('href');
            var relativeLink = $('a').attr('rel');
            productLinks.push(gncHeader + productLink + '<br>');
        });
    });
    return productLinks;
}

/*
exports.productTitles = request(url, function(err, resp, body) {
    $ = cheerio.load(body);
    products = $('li.productListing');

    $(products).each(function(i,link) {
        $ = cheerio.load($(this));
        var a = $('dt');
//        console.log(a.text());
    });
});

exports.productUrls = request(url, function(err, resp, body) {
    $ = cheerio.load(body);
    links = $('li.productListing');

    $(links).each(function(i,link) {
        $ = cheerio.load($(this));
        var productLink = $('a').attr('href');
        var relativeLink = $('a').attr('rel');
//        console.log(gncHeader + productLink + relativeLink);
//        console.log('------------------------------------------------------');
    });
});
*/

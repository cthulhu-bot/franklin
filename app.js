var express = require('express');
var app = express();
var downloader = require('./scraper/download');
var scraper = require('./scraper/scraper');
var gnc = require('./crawler/gnc');

app.get("/hello.txt", function(req, res) {
  var body = "Fitnesse Finder Home Page";
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Content-Length", body.length);
  res.end(body);
});

app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
  res.sendfile("./public/index.html");
});

app.get("/test", function(req, res){
  res.sendfile("./public/test.html");
});

app.get("/gnc", function(req, res){
  res.sendfile("./public/gnc.html");
});

app.get('/gnc/products', function(req, res){
    res.sendfile('./public/gncProducts.html');
});

app.get('/tnation', function(req, res){
  res.sendfile("./public/tnation.html");
});

app.get('/gnc/testProduct', function(req, res){
  res.sendfile('./public/testProduct.html');
});

var gnc = "http://www.gnc.com/home/index.jsp";
var tnation = "http://www.t-nation.com/store/";
var gncTest = "http://www.gnc.com/GNC-Pro-Performance-AMP-Amplified-Wheybolic-Extreme-60-Chocolate/product.jsp?productId=3509954";

downloader.download(gnc, function(data) {
    downloader.writeToFile(data, "./public/gnc.html");
});
downloader.download(tnation, function(data) {
    downloader.writeToFile(data, "./public/tnation.html");
});

app.listen(process.env.port || 3000);
console.log("App started successfully");

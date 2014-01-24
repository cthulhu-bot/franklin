var express = require('express');
var app = express();
var downloader = require('./scraper/download');
var scraper = require('./scraper/scraper');
var crawler = require('./crawler/gnc');

app.get("/hello.txt", function(req, res) {
  var body = "Hello World";
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
  var body = crawler.hello();
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Content-Length", body.length);
  res.end(body);
});

app.get("/tnation", function(req, res){
  res.sendfile("./public/tnation.html");
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

app.listen(3000);
console.log("Listening on port 3000");

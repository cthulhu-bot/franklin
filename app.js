var express = require("express");
var app = express();

exports.start = function() {
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

app.get("/tnation", function(req, res){
  res.sendfile("./public/tnation.html");
});

app.listen(3000);
console.log("Listening on port 3000");

}

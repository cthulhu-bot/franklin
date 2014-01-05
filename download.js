var http = require("http");
var fs = require("fs");
var app = require("./app.js");

function download(url, callback) {
  http.get(url, function(res) {
    var data = "";
    res.on("data", function(chunk) {
      data += chunk;
    });
    res.on("end", function() {
      callback(data);
    });
  }).on("error", function() {
    callback(null);
  });
}

function writeToFile(data, file) {
  if (data) {
    fs.writeFile(file, data, function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("The file was saved successfully");
      }
    });
  }
  else console.log("error");
}

var gnc = "http://www.gnc.com/home/index.jsp";
var tnation = "http://www.t-nation.com/store/";

download(gnc, function(data) {
    writeToFile(data, "./public/gnc.html");
});
download(tnation, function(data) {
    writeToFile(data, "./public/tnation.html");
});

app.start();

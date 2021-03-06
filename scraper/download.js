var http = require("http");
var fs = require("fs");

exports.download = function(url, callback) {
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

exports.writeToFile = function(data, file) {
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

var express = require("express");
var endpoints = require("./endpoints");
var cors = require("cors");

var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser());
app.use(bodyParser.json());
app.use(cors());

for (var key in endpoints) {
  var endpoint = endpoints[key];

  if (endpoint.middleware) {
    app[endpoint.method](endpoint.url, endpoint.middleware, endpoint.handler);
  } else {
    app[endpoint.method](endpoint.url, endpoint.handler);
  }
}

module.exports = exports = app;

var express = require("express");
var endpoints = require("./endpoints");
var cors = require("cors");

var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser());
app.use(bodyParser.json());
app.use(cors());

var corsOptions = {
  origin: "https://denam.on.fleek.co",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.get(
  "/v1/unstoppableDomains/search/:search",
  cors(corsOptions),
  function (req, res, next) {
    res.json({
      msg: "This is CORS-enabled for only https://denam.on.fleek.co.",
    });
  }
);

app.listen(80, function () {
  console.log("CORS-enabled web server listening on port 80");
});

for (var key in endpoints) {
  var endpoint = endpoints[key];

  if (endpoint.middleware) {
    app[endpoint.method](endpoint.url, endpoint.middleware, endpoint.handler);
  } else {
    app[endpoint.method](endpoint.url, endpoint.handler);
  }
}

module.exports = exports = app;

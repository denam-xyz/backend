var express = require("express");
var app = express();
var v1 = require("./v1/");
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "5mb" }));

var appPort = process.env.PORT || 3000;

app.use(v1);

// requires access to lower ports
console.log(
	"\n\nIF THIS THROWS AN ERROR -\nMAKE SURE YOU ARE ALLOWED TO OPEN PORT 3000!\n\n"
);
app.listen(appPort);

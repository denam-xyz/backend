var express = require("express"),
	endpoints = require("./endpoints");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser());
app.use(bodyParser.json());

for (var key in endpoints) {
	var endpoint = endpoints[key];

	if (endpoint.middleware) {
		app[endpoint.method](
			endpoint.url,
			endpoint.middleware,
			endpoint.handler
		);
	} else {
		app[endpoint.method](endpoint.url, endpoint.handler);
	}
}

module.exports = exports = app;

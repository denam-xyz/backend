var endpoints = {};

var unstoppableDomainHandler = require("./handlers/searchHandler");

endpoints.postUnstoppableDomain = {
  url: "/v1/unstoppableDomain/",
  method: "post",
  middleware: [],
  handler: unstoppableDomainHandler.create,
  description: "Create unstoppable Domain",
};

endpoints.getUnstoppableDomains = {
  url: "/v1/unstoppableDomains/",
  method: "get",
  middleware: [],
  handler: unstoppableDomainHandler.get,
  description: "Get all unstoppableDomains",
};

module.exports = endpoints;

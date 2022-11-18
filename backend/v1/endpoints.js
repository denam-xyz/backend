var endpoints = {};

var unstoppableDomainHandler = require("./handlers/unstoppableDomainHandler");

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

endpoints.searchUnstoppableDomains = {
  url: "/v1/unstoppableDomains/search/:search",
  method: "get",
  middleware: [],
  handler: unstoppableDomainHandler.searchUnstoppableDomain,
  description: "Search for unstoppableDomains",
};

module.exports = endpoints;

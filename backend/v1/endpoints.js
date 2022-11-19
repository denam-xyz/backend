var endpoints = {};

var searchHandler = require("./handlers/searchHandler");

endpoints.searchUnstoppableDomains = {
  url: "/v1/unstoppableDomains/search/:search",
  method: "get",
  middleware: [],
  handler: searchHandler.search,
  description: "Search for unstoppableDomains",
};

/*  BELOW CODE IS CURRENTLY NOT BEING USED BUT MIGHT BE NEEDED FOR FUTURE REFERENCE
 
endpoints.postUnstoppableDomain = {
  url: "/v1/unstoppableDomain/",
  method: "post",
  middleware: [],
  handler: searchHandler.create,
  description: "Create unstoppable Domain",
};

endpoints.getUnstoppableDomains = {
  url: "/v1/unstoppableDomains/",
  method: "get",
  middleware: [],
  handler: searchHandler.get,
  description: "Get all unstoppableDomains",
};
 */

module.exports = endpoints;

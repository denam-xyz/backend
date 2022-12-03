var endpoints = {};

var searchHandler = require("./handlers/searchHandler");
var aptosHandler = require("./handlers/aptosHandler");
const blockstacksHandler = require("./handlers/blockstacksHandler");
const ensHandler = require("./handlers/ensHandler");
const sidHandler = require("./handlers/sidHandler");

endpoints.searchUnstoppableDomains = {
  url: "/v1/unstoppableDomains/search/:search",
  method: "get",
  middleware: [],
  handler: searchHandler.search,
  description: "Search for unstoppableDomains",
};

endpoints.searchAptos = {
  url: "/v1/aptos/search/:search",
  method: "get",
  middleware: [],
  handler: aptosHandler.get,
  description: "Search for aptos",
};

endpoints.searchBlockstacks = {
  url: "/v1/blockstacks/search/:search",
  method: "get",
  middleware: [],
  handler: blockstacksHandler.get,
  description: "Search for blockstacks",
};

endpoints.searchEns = {
  url: "/v1/ens/search/:search",
  method: "get",
  middleware: [],
  handler: ensHandler.get,
  description: "Search for ens",
};

endpoints.searchSid = {
  url: "/v1/sid/search/:search",
  method: "get",
  middleware: [],
  handler: sidHandler.get,
  description: "Search for ens",
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

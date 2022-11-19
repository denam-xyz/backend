/* Section 2: definition */

var MySQL = require("../../MySQL");
var ApiError = require("./ApiError");
module.exports = EnsDomains;
var config = require("../../config.json");
const axios = require("axios");
const ethers = require("ethers");

function EnsDomains(ensDomain) {
  this.set(ensDomain);
}

//Only needed for DB interactions
EnsDomains.prototype.set = function setUnstoppableDomain(ensDomain) {
  if (typeof ensDomain !== "undefined") {
    this.description = ensDomain.description;
    this.name = ensDomain.name;
    this.url = ensDomain.url;
  }
};

EnsDomains.prototype.getENSdomains = async function getENSdomains(
  searchWithoutTLD
) {
  var promise = new Promise(async (resolve, reject) => {
    const provider = new ethers.providers.JsonRpcProvider(
      config.rpc_urls.mainnet_eth
    );
    let hasAddressAssociatedWithENS = await provider.resolveName(
      `${searchWithoutTLD}.eth`
    );
    resolve({
      domain: `${searchWithoutTLD}.eth`,
      records: hasAddressAssociatedWithENS
        ? { "crypto.ETH.address": hasAddressAssociatedWithENS }
        : {},
    });
  });
  return promise;
};

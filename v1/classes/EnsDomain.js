/* Section 2: definition */

var MySQL = require("../../MySQL");
var ApiError = require("./ApiError");
module.exports = EnsDomain;
var config = require("../../config.json");
const axios = require("axios");
const ethers = require("ethers");

function EnsDomain(ensDomain) {
  this.set(ensDomain);
}

//Only needed for DB interactions
EnsDomain.prototype.set = function setENSDomain() {
  if (typeof ensDomain !== "undefined") {
    this.description = ensDomain.description;
    this.name = ensDomain.name;
    this.url = ensDomain.url;
  }
};

EnsDomain.prototype.getENSdomain = async function getENSdomain(
  searchWithoutTLD
) {
  var promise = new Promise(async (resolve, reject) => {
    const provider = new ethers.providers.JsonRpcProvider(
      config.rpc_urls.mainnet_eth
    );
    let hasAddressAssociatedWithENS = await provider.resolveName(
      `${searchWithoutTLD}.eth`
    );

    //TODO: use this library instead of ethers
    //https://www.npmjs.com/package/@ensdomains/ens-contracts
    //https://www.youtube.com/watch?v=m-5aPylbqOU&ab_channel=Gasvard

    if (searchWithoutTLD) {
      resolve({
        domain: `${searchWithoutTLD}.eth`,
        records: hasAddressAssociatedWithENS
          ? { "crypto.ETH.address": hasAddressAssociatedWithENS }
          : {},
        network: "eth",
        protocol: "ens",
      });
    } else {
      reject();
    }
  });
  return promise;
};

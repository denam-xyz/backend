const SID = require("@siddomains/sidjs").default;
const SIDfunctions = require("@siddomains/sidjs");
module.exports = SidDomain;
var config = require("../../config.json");
const ethers = require("ethers");

function SidDomain(sidDomain) {
  this.set(sidDomain);
}

//Only needed for DB interactions
SidDomain.prototype.set = function setSid() {
  if (typeof sidDomain !== "undefined") {
    this.description = sidDomain.description;
    this.name = sidDomain.name;
    this.url = sidDomain.url;
  }
};

SidDomain.prototype.getSid = async function getSid(name) {
  var promise = new Promise(async (resolve, reject) => {
    const provider = new ethers.providers.JsonRpcProvider(
      config.rpc_urls.mainnet_bsc
    );

    const sid = new SID({
      provider,
      sidAddress: SIDfunctions.getSidAddress("56"),
    });

    name = `${name}.bnb`;
    const address = await sid.name(name).getAddress(); // 0x123
    if (name) {
      resolve({
        domain: name,
        records:
          address !== ethers.constants.AddressZero
            ? { "crypto.BNB.address": address }
            : {},
        network: "bsc",
        protocol: "sid",
      });
    } else {
      reject();
    }
  });
  return promise;
};

const SID = require("@siddomains/sidjs").default;
const SIDfunctions = require("@siddomains/sidjs");
const Web3 = require("web3");
module.exports = SidDomain;
var config = require("../../config.json");
const axios = require("axios");
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
    const infura = "https://bsc-dataseed2.binance.org/";
    const provider = new Web3.providers.HttpProvider(infura);

    const sid = new SID({
      provider,
      sidAddress: SIDfunctions.getSidAddress("56"),
    });

    const address = await sid.name(name).getAddress(); // 0x123
    console.log("name: %s, address: %s", name, address);

    if (name) {
      resolve({
        domain: `${name}.bnb`,
        records: address ? { "crypto.BNB.address": address } : {},
      });
    } else {
      reject();
    }
  });
  return promise;
};

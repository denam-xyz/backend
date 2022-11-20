const SID = require("@siddomains/sidjs").default;
const SIDfunctions = require("@siddomains/sidjs");
module.exports = NearDomain;
var config = require("../../config.json");
const ethers = require("ethers");

function NearDomain(nearDomain) {
  this.set(nearDomain);
}

//Only needed for DB interactions
NearDomain.prototype.set = function setSid() {
  if (typeof sidDomain !== "undefined") {
    this.description = sidDomain.description;
    this.name = sidDomain.name;
    this.url = sidDomain.url;
  }
};

NearDomain.prototype.getNear = async function getSid(name) {
  var promise = new Promise(async (resolve, reject) => {});
  return promise;
};

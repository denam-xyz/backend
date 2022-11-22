module.exports = AptosDomain;
const axios = require("axios");

function AptosDomain(aptosDomain) {
  this.set(aptosDomain);
}

//Only needed for DB interactions
AptosDomain.prototype.set = function setAptos() {
  if (typeof aptosDomain !== "undefined") {
    this.description = aptosDomain.description;
    this.name = aptosDomain.name;
    this.url = aptosDomain.url;
  }
};

AptosDomain.prototype.getAptos = async function getSid(name) {
  var promise = new Promise(async (resolve, reject) => {
    let ANSaddress = await axios.get(
      `https://www.aptosnames.com/api/mainnet/v1/address/${name}`
    );
    ANSaddress = ANSaddress.data;
    console.log(ANSaddress);
    if (ANSaddress) {
      resolve({
        domain: `${name}.apt`,
        records: ANSaddress.address
          ? { "crypto.ANS.address": ANSaddress.address }
          : {},
        network: "ans",
        protocol: "apt",
      });
    } else {
      reject("Could not get the supported ANS name");
    }
  });
  return promise;
};

// const name = "test";
// const response = await fetch(
//   `https://www.aptosnames.com/api/mainnet/v1/address/${name}`
// );
// const { address } = await response.json();

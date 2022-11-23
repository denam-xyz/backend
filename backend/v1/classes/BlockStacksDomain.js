module.exports = BlockStacksDomain;
const axios = require("axios");

function BlockStacksDomain(blockStacksDomain) {
  this.set(blockStacksDomain);
}

//Only needed for DB interactions
BlockStacksDomain.prototype.set = function setBlockStacks() {
  if (typeof blockStacksDomain !== "undefined") {
    this.description = blockStacksDomain.description;
    this.name = blockStacksDomain.name;
    this.url = blockStacksDomain.url;
  }
};

// Checks
function containsAny(source, target) {
  var result = source.filter(function (item) {
    return target.indexOf(item) > -1;
  });
  return result.length > 0;
}

BlockStacksDomain.prototype.getListOfTLDs = async function getListOfTLDs() {
  var promise = new Promise(async (resolve, reject) => {
    let customSupportedTLDS = [
      "app",
      "btc",
      "id",
      "stx",
      "stacks",
      "blockstack",
    ];
    let supportedTLDs = await axios.get(
      `https://stacks-node-api.mainnet.stacks.co/v1/namespaces`
    );
    supportedTLDs = supportedTLDs.data.namespaces;
    if (containsAny(supportedTLDs, customSupportedTLDS)) {
      resolve(customSupportedTLDS);
    } else {
      reject("Could not get the supported TLDs");
    }
  });
  return promise;
};

BlockStacksDomain.prototype.getBlockStacks = async function getBlockStacks(
  name
) {
  var promise = new Promise(async (resolve, reject) => {
    let supportedTLDs = await new BlockStacksDomain().getListOfTLDs();
    let responseObj = [];

    for (let i = 0; i < supportedTLDs.length; i++) {
      try {
        //console.log(name, supportedTLDs[i], "HELOO");
        const response = await axios.get(
          `https://stacks-node-api.mainnet.stacks.co/v1/names/${name}.${supportedTLDs[i]}`
        );
        if (response.data.address) {
          responseObj.push({
            domain: `${name}.${supportedTLDs[i]}`,
            records: { "crypto.STX.address": response.data.address },
            network: "stx",
            protocol: "stacks",
          });
        }
      } catch (err) {
        responseObj.push({
          domain: `${name}.${supportedTLDs[i]}`,
          records: {},
          network: "stx",
          protocol: "stacks",
        });
      }
    }
    resolve(responseObj);
  });
  return promise;
};

// RESOURCES
// https://github.com/hirosystems/stacks.js
// https://docs.hiro.so/api
// https://stx.name/
// https://www.bnssearch.com/

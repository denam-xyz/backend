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

BlockStacksDomain.prototype.getListOfTLDs = async function getListOfTLDs() {
  var promise = new Promise(async (resolve, reject) => {
    let supportedTLDs = await axios.get(
      `https://stacks-node-api.mainnet.stacks.co/v1/namespaces`
    );
    supportedTLDs = supportedTLDs.data.namespaces;
    console.log(supportedTLDs);
    if (supportedTLDs) {
      resolve(supportedTLDs);
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
    try {
      for (let i = 0; i < supportedTLDs.length; i++) {
        console.log(name, supportedTLDs[i], "HELOO");
        const response = await axios.get(
          `https://stacks-node-api.mainnet.stacks.co/v1/names/${name}.${supportedTLDs[i]}`
        );
        console.log(response.error);
        if (response.address) {
          resolve({
            domain: `${name}.${supportedTLDs[i]}`,
            records: { "crypto.STX.address": response.address },
            network: "stx",
            protocol: "stacks",
          });
        } else if (response.error) {
          resolve({
            domain: `${name}.${supportedTLDs[i]}`,
            records: {},
            network: "stx",
            protocol: "stacks",
          });
        }
      }
    } catch (err) {
      reject(err);
    }
  });
  return promise;
};

// RESOURCES
// https://github.com/hirosystems/stacks.js
// https://docs.hiro.so/api
// https://stx.name/
// https://www.bnssearch.com/

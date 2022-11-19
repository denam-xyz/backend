/* Section 2: definition */

var MySQL = require("../../MySQL");
var ApiError = require("./ApiError");
module.exports = Search;
var config = require("../../config.json");
const axios = require("axios");
const ethers = require("ethers");
const UnstoppableDomains = require("./UnstoppableDomain");
const EnsDomains = require("./ENS");

function Search(unstoppableDomain) {
  this.set(unstoppableDomain);
}

Search.prototype.set = function setSearch(search) {
  if (typeof search !== "undefined") {
    this.description = search.description;
    this.name = search.name;
    this.url = search.url;
  }
};

// Section 1: Unstoppable Domains API
//TODO: Refactor this class to be a 'Search' class instead and make a seperate class for ENS + Unstoppable domain api/calls
//The 'Search' class will be using the child classes UnstoppableDomains + ENS
Search.prototype.searchDomain = async function searchDomain(searchText) {
  var promise = new Promise(async (resolve, reject) => {
    const searchWithoutTLD = searchText.split(".")[0];

    let unstoppableDomain = new UnstoppableDomains();
    let ens = new EnsDomains();

    try {
      //Call UD api data
      let unstoppableDomainData =
        await unstoppableDomain.getUnstoppableDomainData(searchText);

      //Call ENS and push into the UD data array
      let ENSdomain = await ens.getENSdomains(searchWithoutTLD);
      unstoppableDomainData.data.data.push(ENSdomain);
      console.log(unstoppableDomainData.data, "RESULTARRAY");
      resolve(unstoppableDomainData.data);
    } catch (error) {
      console.log(error, "Error occurred fetching: searchDomain()");
      reject(error);
    }
  });
  return promise;
};

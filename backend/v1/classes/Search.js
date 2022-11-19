/* Section 2: definition */
module.exports = Search;
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
//Parent class to all other domain classes, this is where we aggregate into 1 object to spit out to frontend
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

      //TODO ... call the other API classes, NEAR, BSC, Polkadot etc....

      resolve(unstoppableDomainData.data);
    } catch (error) {
      console.log(error, "Error occurred fetching: searchDomain()");
      reject(error);
    }
  });
  return promise;
};

/* Section 2: definition */
module.exports = Search;
const UnstoppableDomain = require("./UnstoppableDomain");
const EnsDomain = require("./EnsDomain");
const SpaceIdDomain = require("./SidDomain");
const AptosDomain = require("./AptosDomain");
const BlockStacksDomain = require("./BlockStacksDomain");

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
//After feat/api_optimization, this class is no longer used (2022-12-03)
Search.prototype.searchDomain = async function searchDomain(searchText) {
  var promise = new Promise(async (resolve, reject) => {
    const searchWithoutTLD = searchText.split(".")[0];

    let unstoppableDomain = new UnstoppableDomain();
    let ens = new EnsDomain();
    let sid = new SpaceIdDomain();
    let ans = new AptosDomain();
    let blockStacks = new BlockStacksDomain();

    try {
      //Call UD api data
      let unstoppableDomainData =
        await unstoppableDomain.getUnstoppableDomainData(searchText);

      //Call ENS and push into the UD data array
      let ENSdomain = await ens.getENSdomain(searchWithoutTLD);
      unstoppableDomainData.push(ENSdomain);

      let sidDomain = await sid.getSid(searchText);
      unstoppableDomainData.push(sidDomain);

      let ansDomain = await ans.getAptos(searchText);
      unstoppableDomainData.push(ansDomain);

      let blockstackDomain = await blockStacks.getBlockStacks(searchText);
      unstoppableDomainData = [...unstoppableDomainData, ...blockstackDomain];

      //TODO ... call the other API classes, NEAR, Polkadot etc....

      resolve(unstoppableDomainData);
    } catch (error) {
      console.log(error, "Error occurred fetching: searchDomain()");
      reject(error);
    }
  });
  return promise;
};

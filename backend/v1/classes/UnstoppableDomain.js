/* Section 2: definition */

var MySQL = require("../../MySQL");
var ApiError = require("./ApiError");
module.exports = UnstoppableDomains;
var config = require("../../config.json");
const axios = require("axios");
const ethers = require("ethers");

const apiHeader = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${config.unstoppable_domains.API_KEY}`,
  },
};

function UnstoppableDomains(unstoppableDomain) {
  this.set(unstoppableDomain);
}

UnstoppableDomains.prototype.set = function setUnstoppableDomain(
  unstoppableDomain
) {
  if (typeof unstoppableDomain !== "undefined") {
    this.description = unstoppableDomain.description;
    this.name = unstoppableDomain.name;
    this.url = unstoppableDomain.url;
  }
};

// Section 1: Unstoppable Domains API
UnstoppableDomains.prototype.searchDomain = async function searchDomain(
  searchText
) {
  var promise = new Promise(async (resolve, reject) => {
    try {
      //TODO: LOOP THROUGH THE LIST OF LIVE SUPPORTED TLDS but gives back HTML response so need to parse it
      //https://docs.unstoppabledomains.com/openapi/resolution/#operation/StatusController.listSupportedTlds

      //If user specified a TLD in his search, remove it and just search the name
      const searchWithoutTLD = searchText.split(".")[0];
      //TODO do not hardcode the TLDs, currently support:  .crypto .nft .x .wallet .bitcoin .dao .888 .zil .blockchain
      const domainData = await axios.get(
        `https://resolve.unstoppabledomains.com/records?domains=${searchWithoutTLD}.crypto&domains=${searchWithoutTLD}.nft&domains=${searchWithoutTLD}.x&domains=${searchWithoutTLD}.wallet&domains=${searchWithoutTLD}.bitcoin&domains=${searchWithoutTLD}.dao&domains=${searchWithoutTLD}.888&domains=${searchWithoutTLD}.blockchain&domains=${searchWithoutTLD}.zil&key=crypto.ETH.address`,
        apiHeader
      );
      //TODO: add ENS call here

      let ENSdomain = await this.getListOfTLDs(searchWithoutTLD);
      console.log(ENSdomain, "ENS DOMAIN RESOLVED");
      domainData.data.data.push(ENSdomain);
      console.log(domainData.data.data, "AFTER PUSH ARR");
      if (domainData) {
        resolve(domainData);
      }
    } catch (error) {
      console.log(error, "Error occurred fetching: searchDomain()");
      reject(error);
    }
  });
  return promise;
};

/* Section 3: CRUD */

UnstoppableDomains.prototype.create = function createUnstoppableDomain(obj) {
  var unstoppableDomain = this;
  console.log(unstoppableDomain, obj, "hey there sister");
  var promise = new Promise((resolve, reject) => {
    MySQL.pool.getConnection(function (err, db) {
      db.execute(
        "insert into `nsfw` (`description`,`name`,`url`) values(?,?,?);",
        [
          unstoppableDomain.description,
          unstoppableDomain.name,
          unstoppableDomain.url,
        ],
        function (err, results, fields) {
          var success = false;
          if (err) {
            reject(new ApiError(500, err));
          } else if (results.length < 1) {
            reject(new ApiError(500, "Domain not saved!"));
          } else {
            unstoppableDomain.id = results.insertId;
            resolve(unstoppableDomain);
          }
          db.release();
        }
      );
    });
  });
  return promise;
};

//Read
UnstoppableDomains.prototype.read = function readUnstoppableDomain() {
  let unstoppableDomain = this;
  var promise = new Promise((resolve, reject) => {
    MySQL.pool.getConnection(function (err, db) {
      console.log(err, "error");
      db.execute(
        "select * from `unstoppable_domain`",

        function (err, results, fields) {
          if (err) {
            reject(new ApiError(500, err));
          } else if (results.length < 1) {
            resolve([]);
          } else {
            unstoppableDomain.set(results);
            resolve(results);
          }
          db.release();
        }
      );
    });
  });
  return promise;
};

//Update
UnstoppableDomains.prototype.update = function updateUnstoppableDomain(
  description,
  name,
  url,
  id
) {
  var promise = new Promise((resolve, reject) => {
    MySQL.pool.getConnection(function (err, db) {
      var sql =
        "update `unstoppable_domain` set description = ?, name = ?, url = ? where id = ?;";
      var params = [description, name, url, id];
      db.execute(sql, params, function (err, results, fields) {
        if (err) {
          reject(new ApiError(500, err));
        } else {
          resolve();
        }
        db.release();
      });
    });
  });
  return promise;
};

UnstoppableDomains.prototype.delete = function deleteUnstoppableDomain() {
  process.on("unhandledRejection", (reason, p) => {
    console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
    // application specific logging, throwing an error, or other logic here
  });
  var unstoppableDomain = this;
  var promise = new Promise((resolve, reject) => {
    if (unstoppableDomain.id) {
      MySQL.pool.getConnection(function (err, db) {
        db.execute(
          "delete from `unstoppable_domain` where `id` = ?",
          [unstoppableDomain.id],
          function (err, results, fields) {
            var success = false;
            if (err) {
              reject(new ApiError(500, err));
            } else if (results.length < 1) {
              reject(new ApiError(400, "Nothing deleted"));
            } else {
              resolve();
            }
            db.release();
          }
        );
      });
    } else {
      reject(new ApiError(400, "Missing unstoppable domain delete id"));
    }
  });
  return promise;
};

/* Additional Helpers */

UnstoppableDomains.prototype.getListOfTLDs = async function getListOfTLDs() {
  var promise = new Promise(async (resolve, reject) => {
    const supportedTLDs = await axios.get(
      `https://docs.unstoppabledomains.com/openapi/resolution/#operation/StatusController.listSupportedTlds`,
      apiHeader
    );
    if (supportedTLDs) {
      resolve(supportedTLDs);
    } else {
      reject("Could not get the supported TLDs");
    }
  });
  return promise;
};

UnstoppableDomains.prototype.getListOfTLDs = async function getListOfTLDs(
  searchWithoutTLD
) {
  var promise = new Promise(async (resolve, reject) => {
    const provider = new ethers.providers.JsonRpcProvider(
      config.rpc_urls.mainnet_eth
    );
    let hasAddressAssociatedWithENS = await provider.resolveName(
      `${searchWithoutTLD}.eth`
    );
    resolve({
      domain: `${searchWithoutTLD}.eth`,
      records: hasAddressAssociatedWithENS
        ? { "crypto.ETH.address": hasAddressAssociatedWithENS }
        : {},
    });
  });
  return promise;
};

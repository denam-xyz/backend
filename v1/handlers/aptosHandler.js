var ApiError = require("../classes/ApiError");
const AptosDomain = require("../classes/AptosDomain");
const Search = require("../classes/Search");

var aptosHandler = {};

aptosHandler.get = function (req, res) {
  console.log("SEARCH HANDLER", req.params);
  let searchText = req.params.search;

  var aptosDomain = new AptosDomain();
  aptosDomain
    .getAptos(searchText)
    .then((resultObj) => {
      if (resultObj) {
        res.status(200).send(resultObj);
      } else {
        res.status(404).send(new ApiError(404, "Not found"));
      }
    })
    .catch((reason) => {
      res.status(400).send(new ApiError(400, reason));
    });
};

module.exports = aptosHandler;

var ApiError = require("../classes/ApiError");
const EnsDomain = require("../classes/EnsDomain");

var ensHandler = {};

ensHandler.get = function (req, res) {
  console.log("SEARCH HANDLER", req.params);
  let searchText = req.params.search;

  var ensDomain = new EnsDomain();
  ensDomain
    .getENSdomain(searchText)
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

module.exports = ensHandler;

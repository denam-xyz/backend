var MySQL = require("../../MySQL");
var ApiError = require("../classes/ApiError");
const UnstoppableDomain = require("../classes/UnstoppableDomain");

var unstoppableDomainsHandler = {};

unstoppableDomainsHandler.get = function (req, res) {
  console.log("do i go here=");
  var unstoppableDomain = new UnstoppableDomain();
  unstoppableDomain
    .read()
    .then((resultObj) => {
      if (resultObj) {
        res.status(200).send(resultObj);
      } else {
        console.log("ERRÖÖÖ");
        res.status(404).send(new ApiError(404, "Not found"));
      }
    })
    .catch((reason) => {
      res.status(400).send(new ApiError(400, reason));
    });
};

unstoppableDomainsHandler.create = function (req, res) {
  var unstoppableDomain = new UnstoppableDomain();
  unstoppableDomain.set(req.body);
  console.log(req.body, "Body in user submit handler");
  unstoppableDomain
    .create()
    .then((resultObj) => {
      res.status(200).send(resultObj);
    })
    .catch((reject) => {
      res.status(400).send(new ApiError(400, reject));
    });
};

unstoppableDomainsHandler.update = function (req, res) {
  //var currentUser = req.apiSession.userid;
  var unstoppableDomain = new UnstoppableDomain();
  unstoppableDomain
    .read(req.params.id, 0)
    .then(() => {
      //TODO: send in json body for update with these 3 values
      if (unstoppableDomain.id) {
        unstoppableDomain.comment = req.body.description;
        unstoppableDomain.geopos = req.body.name;
        unstoppableDomain.geopos = req.body.url;
        unstoppableDomain
          .update()
          .then(() => {
            res.status(200).send({});
          })
          .catch((reject) => {
            res.status(400).send(new ApiError(400, reject));
          });
      } else {
        res.status(403).send(new ApiError(403, "Access denied"));
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = unstoppableDomainsHandler;

import NetworkService from "./NetworkService";

const UnstoppableDomainService = {
  createUnstoppableDomain: function (obj, session) {
    return NetworkService.postResourceWithAuth(
      "v1/unstoppableDomain",
      obj,
      session
    );
  },
  updateUnstoppableDomain: function (id, obj, session) {
    return NetworkService.putResourceWithAuth(
      "v1/unstoppableDomain/" + id,
      obj,
      session
    );
  },
  deleteUnstoppableDomain: function (id, session) {
    return NetworkService.deleteResourceWithAuth(
      "v1/unstoppableDomain/" + id,
      session
    );
  },
  getUnstoppableDomain: function (id, session) {
    if (id) {
      return NetworkService.getResourceWithAuth(
        "v1/unstoppableDomain/" + id,
        session
      );
    } else {
      return NetworkService.getResourceWithAuth(
        "v1/unstoppableDomains/",
        session
      );
    }
  },

  searchUnstoppableDomain: function (search, session) {
    return NetworkService.getResourceWithAuth(
      "v1/unstoppableDomains/search/" + search,
      session
    );
  },
};
export default UnstoppableDomainService;

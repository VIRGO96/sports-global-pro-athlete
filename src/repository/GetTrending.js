import Repository from "./Repository";

const PAYMENT_RESOURCE = "/trending-athletes";
export default {
  getTrending(payload) {
    return Repository.get(
      `${PAYMENT_RESOURCE}?gender=${payload.gender}&sport=${payload.sport}`
    );
  },
};

import GetTrending from "./GetTrending";

const repositories = {
  getTrending: GetTrending,
};

export const RepositoryFactory = {
  get: (name) => repositories[name],
};

import { RepositoryFactory } from "../../repository/RepositoryFactory";
export const getTrendingData =
  (payload, onComplete = () => {}) =>
  async (dispatch) => {
    const trendingRepository = RepositoryFactory.get("getTrending");
    trendingRepository
      .getTrending(payload)
      .then(async (response) => {
        let data = response.data;  
        console.log(data);
        let temp_data = [];
        const maxLength = Math.max(
          data.forBadges.length,
          data.forChats.length,
          data.forGroupChats.length,
          data.forMomentos.length
        );
        for (let i = 0; i < maxLength; i++) {
          const temp = {
            forBadges:
              data.forBadges[i] !== undefined ? data.forBadges[i] : "N/A",
            forChats: data.forChats[i] !== undefined ? data.forChats[i] : "N/A",
            forGroupChats:
              data.forGroupChats[i] !== undefined
                ? data.forGroupChats[i]
                : "N/A",
            forMomentos:
              data.forMomentos[i] !== undefined ? data.forMomentos[i] : "N/A",
          };

          temp_data.push(temp);
        }

        dispatch({
          type: "GET_TRENDING_DATA",
          payload: data,
        });
        onComplete();
      })
      .catch((error) => {
        console.error(error);
      });
  };

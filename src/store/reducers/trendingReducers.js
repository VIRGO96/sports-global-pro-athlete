const initState = {
  trendingData: [],
};
const trendingReducers = (state = initState, action) => {
  switch (action.type) {
    case "GET_TRENDING_DATA":
      return {
        ...state,
        trendingData: action.payload,
      };
    default:
      return { 
        ...state,
      };
  }
};
export default trendingReducers;

const initState = {
  seasonLoading: false,
  loading: false,
  athleteBadges: [],
};

const seasonReducer = (state = initState, action) => {
  switch (action.type) {
    case "Loading":
      return {
        ...state,
        seasonLoading: action.payload,
      };
    case "UPDATE_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "ATHLETE_BADGES":
      return {
        ...state,
        athleteBadges: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
export default seasonReducer;

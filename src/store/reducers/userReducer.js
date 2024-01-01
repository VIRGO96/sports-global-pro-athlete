const initState = {
  allUsers: [],
  allSocialLink: [],
  socialLink: [],
};
const userReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_ALL_USERS":
      return {
        ...state,
        allUsers: action.payload,
      };
    case "ALL_GET_SOCAIL":
      return {
        ...state,
        allSocialLink: action.payload,
      };
    case "GET_SOCAIL_Link":
      return {
        ...state,
        socialLink: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
export default userReducer;

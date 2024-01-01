const initState = {
  authError: "",
  uid: "",
  requested: false,
  registered: false,
  imgLoading: false,
  passwordLoading: false,
  vidLoading: false,
  user: null,
  loading: false,
  qrCodeLoading: false,
};
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "REGISTER_SUCCESS":
      return {
        ...state,
        authError: "",
        registered: true,
      };
    case "REGISTER_FAIL":
      return {
        ...state,
      };
    case "REGISTER_COMPLETE":
      return {
        ...state,
        registered: false,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        uid: action.user.id,
        user: { ...action.user },
        authError: "",
      };
    case "LOGIN_FAIL":
      localStorage.clear();
      return {
        ...state,
        uid: "",
        authError: action.error.message,
      };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        authError: "",
        uid: "",
        registered: false,
        user: null,
      };
    case "UPDATE_IMAGE":
      return {
        ...state,
        imgLoading: true,
      };
    case "UPDATE_IMAGE_END":
      return {
        ...state,
        imgLoading: false,
      };
    case "UPDATE_QRCODE":
      return {
        ...state,
        qrCodeLoading: true,
      };
    case "UPDATE_QRCODE_END":
      return {
        ...state,
        qrCodeLoading: false,
      };
    case "UPDATE_VIDEO":
      return {
        ...state,
        vidLoading: true,
      };
    case "UPDATE_VIDEO_END":
      return {
        ...state,
        vidLoading: false,
      };
    case "ACTION_REQUEST":
      return {
        ...state,
        requested: true,
      };
    case "ACTION_REQUEST_END":
      return {
        ...state,
        requested: false,
      };
    case "LOGIN_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "LOGIN_REQUEST_END":
      return {
        ...state,
        loading: false,
      };
    case "ACTION_FORGET_REQUEST":
      return {
        ...state,
        passwordLoading: true,
      };
    case "ACTION_FORGET_REQUEST_END":
      return {
        ...state,
        passwordLoading: false,
      };
    case "PASSWORD_REQUEST":
      return {
        ...state,
        passwordLoading: true,
      };
    case "PASSWORD_REQUEST_END":
      return {
        ...state,
        passwordLoading: false,
      };
    default:
      return {
        ...state,
      };
  }
};
export default authReducer;

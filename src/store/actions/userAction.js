import firebase from "config/firebase";
import { toast } from "react-toastify";
import { refreshAuth } from "./authActions";

export const getAllUsers = () => async (dispatch) => {
  firebase
    .firestore()
    .collection("users")
    .onSnapshot((query) => {
      let allUser = [];
      query.forEach((doc) => {
        allUser.push({ id: doc.id, ...doc.data() });
      });
      dispatch({ type: "GET_ALL_USERS", payload: allUser });
    });
};

export const addSocialLink = (social_media, uid, onSuccess = () => {}) => {
  return async (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .update({ social_media })
      .then((res) => {
        onSuccess();
        toast.success("Social media updated Successfully");
        dispatch(refreshAuth(uid));
      })
      .catch((err) => {
        toast.warning(err.message);
      });
  };
};

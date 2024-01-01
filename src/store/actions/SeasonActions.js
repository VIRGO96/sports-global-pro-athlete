import firebase from "config/firebase";
import { toast } from "react-toastify";
import { refreshAuth } from "./authActions";

const storage = firebase.storage();
const uploadFile = async (file, folder) => {
  if (file instanceof File) {
    const storageRef = storage.ref().child(`${folder}/${file.name}`);
    const uploadTask = await storageRef.put(file);
    return uploadTask.ref.getDownloadURL();
  }
  return null;
};

export const createSessionBadge =
  (uid, payload, onSuccess = () => {}) =>
  async (dispatch) => {
    dispatch(updateLoader(true));
    try {
      const mediaDownloadURL = await uploadFile(
        payload?.qrCode,
        "seasonQRcodes"
      );
      payload.qrCode = await mediaDownloadURL;

      await firebase
        .firestore()
        .collection("seasonal_badges")
        .add({ ...payload })
        .then(toast.success("Badge Addedd Successfully"), onSuccess())
        .then(
          firebase
            .firestore()
            .collection("users")
            .doc(uid)
            .update({
              seasonalBadge: firebase.firestore.FieldValue.increment(1),
            })
            .then(dispatch(refreshAuth(uid)))
        );
      dispatch(updateLoader(false));
    } catch (error) {
      dispatch(updateLoader(false));
      toast.error(error);
    }
  };
export const updateSeasonalBadge =
  (ID, payload, removedImg, onSuccess = () => {}) =>
  async (dispatch) => {
    dispatch(updateLoader(true));
    try {
      if (payload.qrCode instanceof File && removedImg) {
        await storage.refFromURL(removedImg).delete();
        console.log(
          "Previous image deleted successfully from Firebase Storage"
        );
        const mediaDownloadURL = await uploadFile(
          payload?.qrCode,
          "seasonQRcodes"
        );
        payload.qrCode = await mediaDownloadURL;
      }
      await firebase
        .firestore()
        .collection("seasonal_badges")
        .doc(ID)
        .update({ ...payload })
        .then(toast.success("Badge Updated Successfully"), onSuccess());
      dispatch(updateLoader(false));
    } catch (error) {
      dispatch(updateLoader(false));
      toast.error(error);
    }
  };

export const getSeasonalBages = (ID) => async (dispatch) => {
  dispatch(seasonLoader(true));
  try {
    await firebase
      .firestore()
      .collection("seasonal_badges")
      .where("athleteID", "==", ID)
      .onSnapshot((query) => {
        let athleteBadges = [];
        for (let doc of query.docs) {
          if (doc.exists) {
            athleteBadges.push({ id: doc.id, ...doc.data() });
          }
        }
        dispatch({
          type: "ATHLETE_BADGES",
          payload: athleteBadges,
        });
        dispatch(seasonLoader(false));
      });
  } catch (error) {
    dispatch(seasonLoader(false));
    toast.error(error);
  }
};

export const deleteBadge = (uid, ID) => async (dispatch) => {
  //  ;
  try {
    firebase
      .firestore()
      .collection("seasonal_badges")
      .doc(ID)
      .get()
      .then(async (doc) => {
        let data = doc.data();
        await storage.refFromURL(data?.qrCode).delete();
      })
      .then(
        await firebase
          .firestore()
          .collection("seasonal_badges")
          .doc(ID)
          .delete()
          .then(toast.success("Badge Deleted Successfully"))
          .then(
            firebase
              .firestore()
              .collection("users")
              .doc(uid)
              .update({
                seasonalBadge: firebase.firestore.FieldValue.increment(-1),
              })
              .then(dispatch(refreshAuth(uid)))
          )
      );
  } catch (error) {
    toast.error(error);
  }
};

export const seasonLoader = (val) => async (dispatch) => {
  dispatch({
    type: "Loading",
    payload: val,
  });
};
export const updateLoader = (val) => async (dispatch) => {
  dispatch({
    type: "UPDATE_LOADING",
    payload: val,
  });
};

export const isManagerExist =
  (email, onComplete = () => {}) =>
  async (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .where("email", "==", email)
      .get()
      .then(async (query) => {
        if (query?.docs[0]?.data().role == "fan") {
          onComplete();
        } else {
          toast.error("please enter valid manager email");
        }
      });
  };

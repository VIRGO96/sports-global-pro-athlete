import firebase from "firebase";
import moment from "moment";

export const getconfirmConsentById = (id) => async (dispatch) => {
  dispatch(confirmConsentLoader(true));
  await firebase
    .firestore()
    .collection("consent_confirmation")
    .doc(id)
    .get()
    .then((res) => {
      let response = res.data();
      dispatch(confirmConsentLoader(false));
      if (res.data()) {
        if (response.status == "pending") {
          firebase
            .firestore()
            .collection("consent_confirmation")
            .doc(id)
            .update({
              status: "confirmed",
              confirmed_date: firebase.firestore.Timestamp.now(),
            })
            .then(() =>
              dispatch({
                type: "CONSENT_MESSAGE_CONFIRMED",
                payload: "Verify Consent Successfully",
              })
            );
          dispatch(confirmConsentLoader(false));
        } else {
          dispatch({
            type: "CONSENT_MESSAGE_CONFIRMED",
            payload: "You have Already Confirmed",
          });
          dispatch(confirmConsentLoader(false));
        }
      } else {
        dispatch({
          type: "CONSENT_MESSAGE_CONFIRMED",
          payload: "This Consent Does Not Exist",
        });
        dispatch(confirmConsentLoader(false));
      }
    });
};

export const confirmConsentLoader = (val) => async (dispatch) => {
  dispatch({
    type: "CONFIRM_CONSENT_LOADER",
    payload: val,
  });
};

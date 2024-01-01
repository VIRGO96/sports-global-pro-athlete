import axios from "axios";
import firebase from "../../config/firebase";
import { toast } from "react-toastify";

export const getNotification = (id) => (dispatch) => {
  firebase
    .firestore()
    .collection("notification")
    .where("athleteId", "==", id)
    .onSnapshot(async (query) => {
      let temp_data = [];
      for await (let doc of query.docs) {
        let user = await firebase
          .firestore()
          .collection("users")
          .doc(doc.data().fanId)
          .get();
        temp_data.push({
          ...doc.data(),
          id: doc.id,
          fanName: user.data().name,
          fanEmail: user.data().email,
        });
      }
      dispatch({
        type: "GET_NOTIFICATION",
        payload: temp_data,
      });
    });
};

export const sendEmailToFanNotification =
  (payload, onSuccess = () => {}) =>
  (dispatch) => {
    const athleteResponseEmail = `
                Hi Sport Fan, I see you bought a badge from me.Thanks so much! I just wanted to make sure you know I am available to chat.You can locate the steps to arrange a chat with me by visiting your Chat home Page.I hope to hear from you soon! Cheers.
              `;

    const options = {
      to: payload?.fanEmail,
      subject: "Response from Athlete",
      text: athleteResponseEmail,
    };

    axios
      .post(
        "https://us-central1-fans-help-players.cloudfunctions.net/app/sendUserEmail",
        options
      )
      .then(async (response) => {
        await firebase
          .firestore()
          .collection("notification")
          .doc(payload.id)
          .delete();
        toast.success("Email Send Successfully");
        onSuccess();
      })
      .catch((error) => {
        toast.error("Error occured try Again !");
      });
  };

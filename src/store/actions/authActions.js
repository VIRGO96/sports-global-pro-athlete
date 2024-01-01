import firebase from "../../config/firebase";
import { toast } from "react-toastify";
import axios from "axios";

export const register = (
  creds,
  password,
  paypalDetail,
  onSuccess = () => {}
) => {
  return async (dispatch) => {
    dispatch({
      type: "ACTION_REQUEST",
    });
    let athleteID;
    var docRef = firebase
      .firestore()
      .collection("athkey")
      .doc("Xihwaw7VUvsBOlrRaw48");
    docRef.get().then((doc) => {
      athleteID = doc.data().athleteID;
    });
    firebase
      .auth()
      .createUserWithEmailAndPassword(creds.email, password)
      .then(async (data) => {
        let payObj = {
          athlete_id: data.user.uid,
          payment_id: paypalDetail.id,
          created_at: firebase.firestore.Timestamp.now(),
          amount: paypalDetail.purchase_units[0].amount,
          type: "Athlete payments",
        };
        firebase.firestore().collection("signup_payments").add(payObj);

        let customImgKey = firebase.firestore().collection("users").doc();
        var imgName = creds.img.name;
        let ext2 = imgName.slice(imgName.lastIndexOf("."));
        var img_name = customImgKey.id + ext2.toLowerCase();

        var imgLets = await firebase
          .storage()
          .ref("player_files/" + customImgKey.id + ext2.toLowerCase())
          .put(creds.img);
        var imgURL = await imgLets.ref.getDownloadURL();
        let newCreds = {
          athleteID: athleteID,
          first_name: creds.name,
          last_name: creds.lastName,
          email: creds.email,
          gender: creds.gender,
          paypal_email: creds.paypal,
          phoneNumber: creds.phoneNumber,
          chatRate: creds.chatRate,
          sport: creds.sport,
          sportLevel: creds.sportLevel,
          city: creds.college,
          state: creds.state,
          college: creds.college,
          new_institute_id: creds.new_institute_id,
          institute_name: creds.institute_name,
          zipCode: creds.zipCode,
          termsAndConditions: creds.tac,
          nilPolicy: creds.nilPolicy,
          stateLaw: creds.stateLaw,
          tax: creds.tax,
          agreement: creds.agreement,
          typicalRestrictions: creds.typicalRestrictions,
          videoInstruction: creds.videoInstruction,
          photoInstruction: creds.photoInstruction,
          role: "athlete",
          player_image: {
            file_name: img_name,
            url: imgURL,
          },
          player_video: {
            file_name: "",
            url: "",
          },
          created_at: firebase.firestore.Timestamp.now(),
          lastLoggedIn: firebase.firestore.Timestamp.now(),
        };
        if (newCreds != null) {
          firebase
            .firestore()
            .collection("users")
            .doc(data.user.uid)
            .set(newCreds)
            .then(async (res) => {
              dispatch({
                type: "REGISTER_SUCCESS",
              });
              dispatch({
                type: "ACTION_REQUEST_END",
              });
              toast.success("Account Created Successfully");
              docRef.update({
                athleteID: firebase.firestore.FieldValue.increment(1),
              });
              onSuccess();
            })
            .catch((error) => {
              dispatch({
                type: "REGISTER_FAIL",
              });
              onSuccess();
              dispatch({
                type: "ACTION_REQUEST_END",
              });
              toast.warning(error.message);
              console.log(error.message);
            });
        }
      })
      .catch((error) => {
        dispatch({
          type: "REGISTER_FAIL",
        });
        onSuccess();
        dispatch({
          type: "ACTION_REQUEST_END",
        });
        toast.warning(error.message);
        console.log(error.message);
      });
  };
};
export const registerSuccess = () => {
  return (dispatch) => {
    dispatch({
      type: "REGISTER_COMPLETE",
    });
  };
};
export const refreshAuth = (uid) => async (dispatch) => {
  firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .onSnapshot((doc) => {
      dispatch({
        type: "LOGIN_SUCCESS",
        user: { id: doc.id, a4bEmail: doc.data().a4bEmail, ...doc.data() },
        error: "",
      });
      dispatch({
        type: "LOGIN_REQUEST_END",
      });
    });
};
export const login = (creds) => {
  return (dispatch) => {
    dispatch({
      type: "LOGIN_REQUEST",
    });
    firebase
      .auth()
      .signInWithEmailAndPassword(creds.email, creds.password)
      .then((data) => {
        var docRef = firebase
          .firestore()
          .collection("users")
          .doc(data.user.uid);
        docRef.get().then((doc) => {
          if (doc.exists) {
            if (doc.data().blocked) {
              toast.warning("You are not allowed to access this panel");
              dispatch({
                type: "LOGIN_REQUEST_END",
              });
            } else {
              if (doc.data().role == "athlete") {
                dispatch(refreshAuth(data.user.uid));
                docRef.update({
                  lastLoggedIn: firebase.firestore.FieldValue.serverTimestamp(),
                });
              } else {
                toast.warning("You are not allowed to access this panel");
                dispatch({
                  type: "LOGIN_REQUEST_END",
                });
              }
            }
          } else {
            toast.warning("You are not allowed to access this panel");
            dispatch({
              type: "LOGIN_REQUEST_END",
            });
          }
        });
      })
      .catch((error) => {
        dispatch({
          type: "LOGIN_FAIL",
          uid: "",
          error: error,
        });
        dispatch({
          type: "LOGIN_REQUEST_END",
        });
        toast.warning(error.message);
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signOut()
      .then((data) => {
        dispatch({
          type: "LOGOUT_SUCCESS",
          uid: "",
          user: "",
          error: "",
        });
      })
      .catch((error) => {
        dispatch({
          type: "LOGOUT_FAIL",
          uid: "",
          error: error,
        });
      });
  };
};
export const forgetpassword = (email) => {
  return (dispatch) => {
    dispatch({
      type: "ACTION_FORGET_REQUEST",
    });
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then((res) => {
        dispatch({
          type: "ACTION_FORGET_REQUEST_END",
        });
        toast.success("Recovery Email Sent");
      })
      .catch((err) => {
        dispatch({
          type: "ACTION_FORGET_REQUEST_END",
        });
        toast.warning(err.message);
      });
  };
};
export const updatePassword = (obj) => {
  return (dispatch) => {
    dispatch({
      type: "PASSWORD_REQUEST",
    });
    let user = firebase.auth().currentUser;
    if (user != null) {
      let creds = firebase.auth.EmailAuthProvider.credential(
        user.email,
        obj.currentPassword
      );
      user
        .reauthenticateWithCredential(creds)
        .then(() => {
          user.updatePassword(obj.newPassword);
          dispatch({
            type: "PASSWORD_REQUEST_END",
          });
          toast.success("Password Updated Successfully");
        })
        .catch((error) => {
          toast.warning("Current Password is Invalid");
          dispatch({
            type: "PASSWORD_REQUEST_END",
          });
        });
    } else {
      dispatch({
        type: "PASSWORD_REQUEST_END",
      });
    }
  };
};

export const updateInfo = (uid, payload, type) => async (dispatch) => {
  if (type == "city") {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .update({ city: payload })
      .then((res) => {
        dispatch(refreshAuth(uid));
        toast.success("Profile Updated Successfully");
        return;
      });
  } else if (type == "sport") {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .update({ sport: payload })
      .then((res) => {
        dispatch(refreshAuth(uid));
        toast.success("Profile Updated Successfully");
        return;
      });
  } else if (type == "state") {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .update({ state: payload })
      .then((res) => {
        dispatch(refreshAuth(uid));
        toast.success("Profile Updated Successfully");
        return;
      });
  } else if (type == "name") {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .update({ first_name: payload })
      .then((res) => {
        dispatch(refreshAuth(uid));
        toast.success("Profile Updated Successfully");
        return;
      });
  } else if (type == "last_name") {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .update({ last_name: payload })
      .then((res) => {
        dispatch(refreshAuth(uid));
        toast.success("Profile Updated Successfully");
        return;
      });
  } else if (type == "chatRate") {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .update({ chatRate: payload }, { merge: true })
      .then((res) => {
        dispatch(refreshAuth(uid));
        toast.success("Chat Rate Updated Successfully");
        return;
      });
  } else if (type == "sportLevel") {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .update({ sportLevel: payload })
      .then((res) => {
        dispatch(refreshAuth(uid));
        toast.success("Profile Updated Successfully");
        return;
      });
  } else if (type == "youtube") {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .update({ youtube_url: payload })
      .then((res) => {
        dispatch(refreshAuth(uid));
        toast.success("Profile Updated Successfully");
        return;
      });
  } else if (type == "college") {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .update({ college: payload })
      .then((res) => {
        dispatch(refreshAuth(uid));
        toast.success("Profile Updated Successfully");
        return;
      });
  } else if (type == "teamList") {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .update({ promoted_teammates: payload })
      .then((res) => {
        dispatch(refreshAuth(uid));
        toast.success("Profile Updated Successfully");
        return;
      });
  }
};

export const updateImg = (obj, uid) => {
  return async (dispatch) => {
    dispatch({
      type: "UPDATE_IMAGE",
    });
    var desertRef = await firebase
      .storage()
      .ref()
      .child(`player_files/${obj.fileName}`);
    desertRef
      .delete()
      .then(function () {
        console.log("deleted succcessfully");
      })
      .catch(function (error) {
        console.log("error");
      });
    let customImgKey = firebase.firestore().collection("users").doc();
    var imgName = obj.image.name;
    let ext2 = imgName.slice(imgName.lastIndexOf("."));
    var img_name = customImgKey.id + ext2.toLowerCase();

    var imgLets = await firebase
      .storage()
      .ref("player_files/" + customImgKey.id + ext2.toLowerCase())
      .put(obj.image);
    var imgURL = await imgLets.ref.getDownloadURL();
    let player_image = {
      file_name: img_name,
      url: imgURL,
    };
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .update({ player_image })
      .then((res) => {
        toast.success("Image Updated Successfully");
        dispatch({
          type: "UPDATE_IMAGE_END",
        });
      })
      .catch((error) => {
        toast.warning(error.message);
        dispatch({
          type: "UPDATE_IMAGE_END",
        });
      });
  };
};

export const updateQrCode = (obj, uid) => {
  return async (dispatch) => {
    dispatch({
      type: "UPDATE_QRCODE",
    });
    if (obj.fileName) {
      var desertRef = await firebase
        .storage()
        .ref()
        .child(`player_files/${obj.fileName}`);

      desertRef
        .delete()
        .then(function () {
          console.log("deleted succcessfully");
        })
        .catch(function (error) {
          console.log("error");
        });
    }
    let customImgKey = firebase.firestore().collection("users").doc();
    var imgName = obj.qrCode.name;
    let ext2 = imgName.slice(imgName.lastIndexOf("."));
    var img_name = customImgKey.id + ext2.toLowerCase();

    var imgLets = await firebase
      .storage()
      .ref("player_files/" + customImgKey.id + ext2.toLowerCase())
      .put(obj.qrCode);
    var imgURL = await imgLets.ref.getDownloadURL();
    let qrCode = {
      file_name: img_name,
      url: imgURL,
    };
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .update({ qrCode })
      .then((res) => {
        toast.success("QrCode Updated Successfully");
        dispatch(refreshAuth(uid));
        dispatch({
          type: "UPDATE_QRCODE_END",
        });
      })
      .catch((error) => {
        toast.warning(error.message);
        dispatch({
          type: "UPDATE_QRCODE_END",
        });
      });
  };
};
// export const updateQrCode = (formData, uid) => {
//   return async (dispatch) => {
//     dispatch({
//       type: "UPDATE_QRCODE",
//     });

//     const userDoc = await firebase
//       .firestore()
//       .collection("users")
//       .doc(uid)
//       .get();
//     const existingImage = userDoc.data()?.qrCode;

//     if (existingImage) {
//       const existingImageRef = firebase
//         .storage()
//         .ref("player_files/" + existingImage.file_name);
//       await existingImageRef.delete();
//     }

//     const customImgKey = firebase.firestore().collection("users").doc();
//     const imgName = formData.qrCode.name;
//     const ext = imgName.slice(imgName.lastIndexOf("."));
//     const img_name = customImgKey.id + ext.toLowerCase();

//     try {
//       const imgUpload = await firebase
//         .storage()
//         .ref("player_files/" + img_name)
//         .put(formData.qrCode);
//       const imgURL = await imgUpload.ref.getDownloadURL();

//       const qrCode = {
//         file_name: img_name,
//         url: imgURL,
//       };

//       await firebase
//         .firestore()
//         .collection("users")
//         .doc(uid)
//         .update({ qrCode });

//       dispatch({
//         type: "UPDATE_QRCODE_END",
//       });

//       toast.success("Image Updated Successfully");
//     } catch (error) {
//       console.error("Error updating QR code:", error);
//       toast.warning("Failed to update QR code image");
//       dispatch({
//         type: "UPDATE_QRCODE_END",
//       });
//     }
//   };
// };

export const updateVid = (obj, uid) => {
  return async (dispatch) => {
    dispatch({
      type: "UPDATE_VIDEO",
    });
    var desertRef = await firebase
      .storage()
      .ref()
      .child(`player_files/${obj.fileName}`);
    desertRef
      .delete()
      .then(function () {
        console.log("deleted succcessfully");
      })
      .catch(function (error) {
        console.log("error");
      });
    let customVidKey = firebase.firestore().collection("users").doc();
    var vidName = obj.video.name;
    let ext2 = vidName.slice(vidName.lastIndexOf("."));
    var vid_name = customVidKey.id + ext2.toLowerCase();

    var vidLets = await firebase
      .storage()
      .ref("player_files/" + customVidKey.id + ext2.toLowerCase())
      .put(obj.image);
    var vidURL = await vidLets.ref.getDownloadURL();
    let player_video = {
      file_name: vid_name,
      url: vidURL,
    };
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .update({ player_video })
      .then((res) => {
        toast.success("Video Updated Successfully");
        dispatch({
          type: "UPDATE_VIDEO_END",
        });
      })
      .catch((error) => {
        toast.warning(error.message);
        dispatch({
          type: "UPDATE_VIDEO_END",
        });
      });
  };
};

export const isUserExist =
  (email, onComplete = () => {}) =>
  async () => {
    let user = await firebase
      .firestore()
      .collection("users")
      .where("email", "==", email)
      .get();
    if (user.docs.length == 0) {
      onComplete();
    } else {
      toast.warning("This email already exist");
    }
  };

import firebase from "config/firebase";

export const newSchoolsData = (state, college) => async (dispatch) => {
  firebase
    .firestore()
    .collection("test_schools")
    .where("state", "==", state)
    .where("county", "==", college)
    .onSnapshot((query) => {
      let temp = [];
      query.forEach((doc) => {
        temp.push({
          ...doc.data(),
        });
      });
      dispatch({ type: "NEW_SCHOOLS", payload: temp });
    });
};

export const newSchoolsDataByIdAction = (school) => async (dispatch) => {
  await firebase
    .firestore()
    .collection("test_schools")
    .where("institutes", "array-contains", school)
    .onSnapshot((query) => {
      let temp = [];
      query.forEach((doc) => {
        temp.push({ id: doc.id, ...doc.data() });
      });
      dispatch({ type: "GET_NEW_SCHOOLS_BY_ID", payload: temp });
    });
};

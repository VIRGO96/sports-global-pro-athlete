import firebase from "config/firebase";

export const newCollegeUniversities = (state, college) => async (dispatch) => {
  firebase
    .firestore()
    .collection("test-colleges-universities")
    .where("state", "==", state)
    .where("city", "==", college)
    .onSnapshot((query) => {
      let temp = [];
      query.forEach((doc) => {
        temp.push({
          ...doc.data(),
        });
      });
      dispatch({ type: "NEW_COLLEGE_UNIVERSITIES", payload: temp });
    });
};

export const newCollegeUniversityDataById = (school) => async (dispatch) => {
  firebase
    .firestore()
    .collection("test-colleges-universities")
    .where("institutes", "array-contains", school)
    .onSnapshot((query) => {
      let temp = [];
      query.forEach((doc) => {
        temp.push({ id: doc.id, ...doc.data() });
      });
      dispatch({ type: "GET_NEW_COLLEGE_BY_ID", payload: temp });
    });
};

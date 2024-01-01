import firebase from "config/firebase";
import { toast } from "react-toastify";

export const fetchStates = () => async (dispatch) => {
  firebase
    .firestore()
    .collection("states")
    .orderBy("name", "asc")
    .onSnapshot((query) => {
      var tempStates = [];
      query.forEach((doc) => {
        tempStates.push({ id: doc.id, ...doc.data() });
      });
      dispatch({
        type: "GET_STATES",
        payload: tempStates,
      });
    });
};
export const fetchSchoolStates = () => async (dispatch) => {
  firebase
    .firestore()
    .collection("school_states")
    .orderBy("name", "asc")
    .onSnapshot((query) => {
      var tempStates = [];
      query.forEach((doc) => {
        tempStates.push({ id: doc.id, ...doc.data() });
      });
      dispatch({
        type: "GET_SCHOOL_STATES",
        payload: tempStates,
      });
    });
};

export const getCollegeCity = (state) => async (dispatch) => {
  firebase
    .firestore()
    .collection("test-colleges-universities")
    .where("state", "==", state)
    .orderBy("city", "asc")
    .onSnapshot((query) => {
      let temp = [];
      query.forEach((doc) => {
        temp.push({
          ...doc.data(),
        });
      });
      dispatch({ type: "GET_CITY_BY_STATE", payload: temp });
    });
};

export const getSchoolCounty = (state) => async (dispatch) => {
  firebase
    .firestore()
    .collection("test_schools")
    .where("state", "==", state)
    .orderBy("county", "asc")
    .onSnapshot((query) => {
      let temp = [];
      query.forEach((doc) => {
        temp.push({
          ...doc.data(),
        });
      });
      dispatch({ type: "GET_COUNTY_BY_STATE", payload: temp });
    });
};

export const newCollegeUniversitiesData =
  (state, college) => async (dispatch) => {
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

export const createComplaint = (obj) => {
  return async (dispatch) => {
    dispatch({
      type: "GENERATE_COMPLAINT",
    });
    firebase
      .firestore()
      .collection("complaints")
      .add(obj)
      .then((res) => {
        dispatch({
          type: "GENERATE_COMPLAINT_END",
        });
        toast.success("Issue Submitted Successfully");
      })
      .catch((err) => {
        dispatch({
          type: "GENERATE_COMPLAINT_END",
        });
        toast.warning(err.message);
      });
  };
};
export const updateComplaint = (data, id) => async (dispatch) => {
  await dispatch(updateComplaintloader(true));
  await firebase
    .firestore()
    .collection("complaints")
    .doc(id)
    .update(data)
    .then((res) => {
      dispatch(updateComplaintloader(false));
      alert("Issues update successfully");
    });
  dispatch(updateComplaintloader(false));
};
export const getIssues = (id) => {
  return async (dispatch) => {
    firebase
      .firestore()
      .collection("complaints")
      .where("issue_by", "==", id)
      .onSnapshot((query) => {
        var requests = [];
        query.forEach((doc) => {
          requests.push({ id: doc.id, ...doc.data() });
        });
        dispatch({
          type: "GET_ATHLETE_ISSUES",
          payload: requests,
        });
      });
  };
};
export const deleteIssue = (id) => {
  return async (dispatch) => {
    firebase
      .firestore()
      .collection("complaints")
      .doc(id)
      .delete()
      .then(toast.success("Issue Deleted Successfully"));
  };
};

export const updateComplaintloader = (data) => (dispatch) => {
  dispatch({
    type: "UPDATEComplaintLOADER",
    payload: data,
  });
};
export const addInstantChatEmailInUser =
  (id, email, onComplete = () => {}) =>
  async (dispatch) => {
    await firebase
      .firestore()
      .collection("users")
      .doc(id)
      .update({
        a4bEmail: email,
      })
      .then(() => {
        toast.success("Email successfully added to user");
        onComplete();
      })
      .catch((error) => {
        toast.success(error);
      });
  };

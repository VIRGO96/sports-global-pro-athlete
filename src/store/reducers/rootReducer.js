import { combineReducers } from "redux";
import athleteReducer from "./athleteReducers";
import authReducer from "./authReducers";
import fansReducers from "./fansReducers";
import requestedCitiesReducer from "./requestedCitiesReducer";
import requestedSportsReducer from "./requestedSportsReducer";
import sportReducer from "./sportReducer";
import userReducer from "./userReducer";
import confirmConsentReducer from "./confirmConsentReducer";
import newSchoolsReducer from "./newSchoolsReducer";
import newCollegeUniversitiesData from "./newCollegeUniversitiesReducer";
import shopReducer from "./shopReducer";
import tutorialsReducer from "./tutorialsReducer";
import notificationReducer from "./notificationReducer";
import seasonReducer from "./seasonReducer";
import trendingReducers from "./trendingReducers";

const rootReducer = combineReducers({
  auth: authReducer,
  fan: fansReducers,
  athlete: athleteReducer,
  sport: sportReducer,
  users: userReducer,
  requestedSports: requestedSportsReducer,
  requestedCities: requestedCitiesReducer,
  confirmConsent: confirmConsentReducer,
  schools: newSchoolsReducer,
  collegeAndUniversities: newCollegeUniversitiesData,
  shop: shopReducer,
  tutorial: tutorialsReducer,
  notification: notificationReducer,
  season: seasonReducer,
  trending: trendingReducers,
});
export default rootReducer;

import axios from "axios";
const baseDomain = "https://us-central1-fans-help-players.cloudfunctions.net";
const baseURL = `${baseDomain}/app`;
let axiosObj;
axiosObj = axios.create({
  baseURL,
});
export default axiosObj;

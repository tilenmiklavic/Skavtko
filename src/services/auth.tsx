import moment from "moment";
import Auth from "../classes/Auth";

export default function isAuthenticated() {
  let auth: Auth = JSON.parse(localStorage.getItem("auth") || "{}");

  if (auth.access_token && moment() < moment(auth.expiration_timestamp)) {
    return true;
  }

  return false;
}

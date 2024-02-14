import { useState, useMemo, useEffect } from "react";
import Header from "../../components/Header/header";
import "./Profile.css";
import UserProfile from "../../classes/Profile";
import Card from "../../components/Card/Cards";
import Auth from "../../classes/Auth";
import SecondaryButton from "../../components/Buttons/secondaryButton";
import moment from "moment";

export default function Profile() {
  const [profile, setProfile] = useState({} as UserProfile);
  const [auth, setAuth] = useState({} as Auth);
  const [loggedId, setLoggedId] = useState(false);
  const [date, setDate] = useState("");

  const visibleTodos = useEffect(() => {
    if (Object.keys(profile).length == 0) {
      setProfileInfo();
    }
  }, []);

  const setProfileInfo = () => {
    setProfile(JSON.parse(localStorage.getItem("profile") || "{}"));
    setAuth(JSON.parse(localStorage.getItem("auth") || "{}"));
    setLoggedId(true);
    setDate(moment(auth.expiration_timestamp).format("HH:mm - DD. MM. YYYY"));
  };

  const getProfileInfo = async (access_token: string) => {
    const response = await fetch("/api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apiKey: process.env.REACT_APP_API_KEY,
        accessToken: access_token,
      }),
    });

    const data = await response.json();
    setProfileInfo();

    localStorage.setItem("profile", JSON.stringify(data.data));
  };

  const initLogin = async () => {
    // @ts-ignore
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: process.env.REACT_APP_CLIENT_ID,
      scope:
        "https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/userinfo.profile",
      callback: (response: any) => {
        console.log(response);
        // @ts-ignore
        getProfileInfo(response.access_token);
        response.expiration_timestamp =
          new Date().getTime() + 1000 * response.expires_in;
        localStorage.setItem("auth", JSON.stringify(response));
      },
    });

    client.requestAccessToken();
  };

  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("profile");
    setProfile({} as UserProfile);
    setAuth({} as Auth);
    setLoggedId(false);
  };

  return (
    <>
      <Header title="Profile" />
      {loggedId ? (
        <>
          <Card>
            <div className="flex flex-col items-center">
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src={profile.picture}
                alt="Bonnie image"
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {profile.name}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {profile.email}
              </span>
            </div>
          </Card>
          <Card>
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              Login
            </h5>
            <div>
              <span>Status</span>{" "}
              <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                Active
              </span>
            </div>
            <div>
              <span>Validity</span>{" "}
              <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                {date}
              </span>
            </div>
            <div className="mt-5">
              <SecondaryButton label={"Logout"} onClick={logout} />
            </div>
          </Card>
        </>
      ) : (
        <Card>
          <button
            type="button"
            onClick={initLogin}
            className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
          >
            <svg
              className="w-4 h-4 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 19"
            >
              <path
                fillRule="evenodd"
                d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                clipRule="evenodd"
              />
            </svg>
            Sign in with Google
          </button>
        </Card>
      )}
    </>
  );
}

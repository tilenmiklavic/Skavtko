import Header from "../../components/Header/header";
import "./Profile.css";

export default function Profile() {
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
    console.log(data);
  };

  const initLogin = async () => {
    console.log(process.env.REACT_APP_CLIENT_ID);
    // @ts-ignore
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: process.env.REACT_APP_CLIENT_ID,
      scope:
        "https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/userinfo.profile",
      callback: (response: any) => {
        console.log(response);
        // @ts-ignore
        getProfileInfo(response.access_token);
        localStorage.setItem("auth", JSON.stringify(response));
      },
    });

    client.requestAccessToken();
  };

  return (
    <>
      <Header title="Profile" />
      <div className="card">Profile</div>

      <div className="card text-center">
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
      </div>
    </>
  );
}

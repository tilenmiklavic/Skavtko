import toast from "react-hot-toast";
import Header from "../../components/Header/header";
import { useState } from "react";
import Scrollable from "../../components/Common/Scrollable";
import SettingsButtonGroup from "../../components/Buttons/settingsButtonGroup";
import GeneralSettings from "../../components/Settings/general";
import RacuniSettings from "../../components/Settings/racuni";
import PotniSettings from "../../components/Settings/potni";
import PrisotnostSettings from "../../components/Settings/prisotnost";

export default function FinanceSettings() {
  const [link, setLink] = useState("");
  const [page, setPage] = useState(0);

  const saveLink = async (event: any) => {
    event.preventDefault();

    setLink(event.target.link.value);

    const sheetInfo = {
      link: link,
      id: link.toString().split("/")[5],
    };

    localStorage.setItem("sheetInfo", JSON.stringify(sheetInfo));
    toast.success("Link saved!");
  };

  const changePage = (page: number) => {
    setPage(page);
  };

  return (
    <>
      <div>
        <Header title={"Nastavitve"} />
      </div>
      <form onSubmit={saveLink} className="mb-4">
        <Scrollable>
          <SettingsButtonGroup changePage={changePage} />

          <div className="mt-6">
            {page === 0 && <GeneralSettings />}
            {page === 1 && <RacuniSettings />}
            {page === 2 && <PotniSettings />}
            {page === 3 && <PrisotnostSettings />}
          </div>
        </Scrollable>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </>
  );
}

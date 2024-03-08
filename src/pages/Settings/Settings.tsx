import toast from "react-hot-toast";
import Header from "../../components/Header/header";
import { useState } from "react";
import SettingsButtonGroup from "../../components/Buttons/settingsButtonGroup";
import GeneralSettings from "../../components/Settings/general";
import RacuniSettings from "../../components/Settings/racuni";
import PotniSettings from "../../components/Settings/potni";
import PrisotnostSettings from "../../components/Settings/prisotnost";
import SettingsInterface from "../../classes/SettingsInterface";
import { Tabs, TabsHeader } from "@material-tailwind/react";

export default function Settings() {
  const [link, setLink] = useState("");
  const [page, setPage] = useState(0);

  const saveLink = async (event: any) => {
    event.preventDefault();

    switch (page) {
      case 1:
        setLink(event.target.racuni_input.value);
        break;
      case 2:
        setLink(event.target.potni_input.value);
        break;
      case 3:
        setLink(event.target.prisotnost_input.value);
        break;
      default:
        break;
    }

    const sheetInfo: SettingsInterface = JSON.parse(
      localStorage.getItem("sheetInfo") || "{}"
    );

    const sheetDetails = {
      link: link,
      id: link.toString().split("/")[5],
    };

    switch (page) {
      case 1:
        sheetInfo.racuni = sheetDetails;
        break;
      case 2:
        sheetInfo.potni = sheetDetails;
        break;
      case 3:
        sheetInfo.prisotnost = sheetDetails;
        break;
      default:
        break;
    }

    localStorage.setItem("settings", JSON.stringify(sheetInfo));
    toast.success("Link saved!");
  };

  const saveSettings = async (event: any) => {
    event.preventDefault();

    if (page === 0) {
      const sheetInfo: SettingsInterface = JSON.parse(
        localStorage.getItem("sheetInfo") || "{}"
      );

      sheetInfo.steg = event.target.steg_input.value;
      sheetInfo.veja = event.target.veja_select.value;

      localStorage.setItem("settings", JSON.stringify(sheetInfo));

      toast.success("Settings saved!");
    } else {
      saveLink(event);
    }
  };

  const changePage = (page: number) => {
    setPage(page);
  };

  return (
    <div className="bg-blue flex flex-col flex-1" id="demo">
      <div>
        <Header title={"Nastavitve"} />
      </div>
      <form onSubmit={saveSettings} className="mb-4 flex flex-col flex-1">
        <div className=" flex-1 flex flex-col">
          <SettingsButtonGroup changePage={changePage} />

          <div className="flex-1 flex flex-col mt-6">
            {page === 0 && <GeneralSettings />}
            {page === 1 && <RacuniSettings />}
            {page === 2 && <PotniSettings />}
            {page === 3 && <PrisotnostSettings />}
          </div>
          <div className="flex">
            <button
              type="submit"
              className="mt-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Shrani
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

import toast from "react-hot-toast";
import Header from "../../components/Header/header";
import { useState } from "react";
import SettingsButtonGroup from "../../components/Buttons/settingsButtonGroup";
import GeneralSettings from "../../components/Settings/general";
import RacuniSettings from "../../components/Settings/racuni";
import PotniSettings from "../../components/Settings/potni";
import PrisotnostSettings from "../../components/Settings/prisotnost";
import SettingsInterface from "../../classes/SettingsInterface";
import {
  Button,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import NapredovanjeSettings from "../../components/Settings/napredovanje";
import FinanceSettings from "../../components/Settings/finance";
import { getSettings } from "../../services/settings";

export default function Settings() {
  const [link, setLink] = useState("");
  const [page, setPage] = useState(0);

  const saveLink = async (event: any) => {
    event.preventDefault();

    const racuniLink = event.target?.racuni_input?.value;
    const potniLink = event.target?.potni_input?.value;
    const prisotnostLink = event.target?.prisotnost_input?.value;
    const napredovanjeLink = event.target?.napredovanje_input?.value;
    const skupineLink = event.target?.group_input?.value;

    const settings = getSettings();

    settings.racuni = racuniLink
      ? {
          link: racuniLink,
          id: racuniLink.toString().split("/")[5],
        }
      : settings.racuni;

    settings.potni = potniLink
      ? {
          link: potniLink,
          id: potniLink.toString().split("/")[5],
        }
      : settings.potni;

    settings.prisotnost = prisotnostLink
      ? {
          link: prisotnostLink,
          id: prisotnostLink.toString().split("/")[5],
        }
      : settings.prisotnost;

    settings.napredovanje = napredovanjeLink
      ? {
          link: napredovanjeLink,
          id: napredovanjeLink.toString().split("/")[5],
        }
      : settings.napredovanje;

    settings.group = skupineLink
      ? {
          link: skupineLink,
          id: skupineLink.toString().split("/")[5],
        }
      : settings.group;

    localStorage.setItem("settings", JSON.stringify(settings));
    toast.success("Settings saved!");
  };

  const changePage = (page: number) => {
    setPage(page);
  };

  const saveSettings = async (event: any) => {
    event.preventDefault();

    if (page === 0) {
      let settings = getSettings();

      settings.steg = event.target.steg_input.value;
      settings.veja = event.target.veja_select.value;

      localStorage.setItem("settings", JSON.stringify(settings));

      toast.success("Settings saved!");
    } else {
      saveLink(event);
    }
  };

  const data = [
    {
      label: "General",
      value: "general",
      index: 0,
      desc: <GeneralSettings />,
    },
    {
      label: "Finance",
      value: "finance",
      index: 1,
      desc: <FinanceSettings />,
    },
    {
      label: "Napredovanje",
      value: "napredovanje",
      index: 1,
      desc: <NapredovanjeSettings />,
    },
    {
      label: "Prisotnost",
      value: "prisotnost",
      index: 3,
      desc: <PrisotnostSettings />,
    },
  ];

  return (
    <div className="bg-blue flex flex-col flex-1" id="demo">
      <div>
        <Header title={"Nastavitve"} />
      </div>
      <form
        method="post"
        onSubmit={saveSettings}
        className="mb-4 flex flex-col flex-1"
      >
        <div className=" flex-1 flex flex-col">
          <div className="flex-1 flex flex-col mt-6">
            <Tabs value="general">
              <TabsHeader placeholder={undefined}>
                {data.map(({ label, value, index }) => (
                  <Tab
                    key={value}
                    value={value}
                    placeholder={undefined}
                    onClick={() => changePage(index)}
                  >
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody placeholder={undefined} className="mt-6">
                {data.map(({ value, desc }) => (
                  <TabPanel key={value} value={value} className="p-0">
                    {desc}
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>
          </div>
          <div className="flex">
            {/* <button
              type="submit"
              className="mt-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Shrani
            </button> */}
            <Button
              color="blue"
              className="w-full"
              type="submit"
              placeholder={undefined}
            >
              Shrani
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

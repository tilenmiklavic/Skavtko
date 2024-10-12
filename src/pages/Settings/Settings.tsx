import toast from "react-hot-toast";
import Header from "../../components/Header/header";
import { useEffect, useState } from "react";
import GeneralSettings from "../../components/Settings/general";
import PrisotnostSettings from "../../components/Settings/prisotnost";
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
import { getSheets } from "../../services/drive";
import { sheetLink } from "../../services/constants";
import { useLocation } from "react-router-dom";

export default function Settings() {
  const tabs = ["general", "finance", "napredovanje", "prisotnost"];
  const [page, setPage] = useState(0);
  const [tab, setTab] = useState(tabs[useLocation()?.state?.tab || 0]);

  const saveLink = async (event: any) => {
    event.preventDefault();

    const racuniLink = event.target?.racuni_input?.value;
    const racuniId = event.target?.racuni_sheet_select?.value;
    const potniLink = event.target?.potni_input?.value;
    const potniId = event.target?.potni_sheet_select?.value;
    const prisotnostLink = event.target?.prisotnost_input?.value;
    const prisotnostId = event.target?.prisotnost_sheet_select?.value;
    const napredovanjeLink = event.target?.napredovanje_input?.value;
    const napredovanjeId = event.target?.napredovanje_sheet_select?.value;
    const skupineLink = event.target?.group_input?.value;
    const skupineId = event.target?.group_sheet_select?.value;

    const settings = getSettings();

    settings.racuni = racuniLink
      ? {
          link: racuniLink,
          id: racuniLink.toString().split("/")[5],
        }
      : racuniId
        ? { link: `${sheetLink}${racuniId}`, id: racuniId }
        : settings.racuni;

    settings.potni = potniLink
      ? {
          link: potniLink,
          id: potniLink.toString().split("/")[5],
        }
      : potniId
        ? { link: `${sheetLink}${potniId}`, id: potniId }
        : settings.potni;

    settings.prisotnost = prisotnostLink
      ? {
          link: prisotnostLink,
          id: prisotnostLink.toString().split("/")[5],
        }
      : prisotnostId
        ? { link: `${sheetLink}${prisotnostId}`, id: prisotnostId }
        : settings.prisotnost;

    settings.napredovanje = napredovanjeLink
      ? {
          link: napredovanjeLink,
          id: napredovanjeLink.toString().split("/")[5],
        }
      : napredovanjeId
        ? { link: `${sheetLink}${napredovanjeId}`, id: napredovanjeId }
        : settings.napredovanje;

    settings.group = skupineLink
      ? {
          link: skupineLink,
          id: skupineLink.toString().split("/")[5],
        }
      : skupineId
        ? { link: `${sheetLink}${skupineId}`, id: skupineId }
        : settings.group;

    localStorage.setItem("settings", JSON.stringify(settings));
    toast.success("Settings saved!");
  };

  const changePage = (page: number) => {
    setPage(page);
  };

  const saveSettings = async (event: any) => {
    event.preventDefault();
    let settings = getSettings();

    if (page === 0) {
      settings.steg = event.target.steg_input.value;
      settings.veja = event.target.veja_select.value;

      localStorage.setItem("settings", JSON.stringify(settings));

      toast.success("Settings saved!");

      return;
    } else if (page === 3) {
      settings.symbols.present = event.target.present_symbol_input.value;
      settings.symbols.excused = event.target.excused_symbol_input.value;
      settings.symbols.absent = event.target.absent_symbol_input.value;

      settings.colors.present = event.target.present_color_input.value;
      settings.colors.excused = event.target.excused_color_input.value;
      settings.colors.absent = event.target.absent_color_input.value;

      localStorage.setItem("settings", JSON.stringify(settings));
    }
    saveLink(event);
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

  const getAllSheets = async () => {
    await getSheets();
  };

  useEffect(() => {
    getAllSheets();
  });

  return (
    <div className="bg-blue flex flex-col flex-1" id="demo">
      <div>
        <Header title={"Nastavitve"} settings={true} />
      </div>
      <form
        method="post"
        onSubmit={saveSettings}
        className="mb-4 flex flex-col flex-1"
      >
        <div className=" flex-1 flex flex-col">
          <div className="flex-1 flex flex-col mt-6">
            <Tabs value={tab}>
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
          <div className="flex flex-col">
            <Button
              color="black"
              className="w-full mt-10"
              type="submit"
              placeholder={undefined}
            >
              <span>Shrani</span>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

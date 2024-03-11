import {
  Button,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import Header from "../../components/Header/header";
import { useState } from "react";
import OsebnoNaprevanje from "../../components/Napredovanje/on";
import TekmovanjeSkupine from "../../components/Napredovanje/skupine";

function Napredovanje() {
  const [page, setPage] = useState(0);

  const changePage = (page: number) => {
    setPage(page);
  };
  const data = [
    {
      label: "ON",
      value: "on",
      index: 0,
      desc: <OsebnoNaprevanje />,
    },
    {
      label: "Skupine",
      value: "skupina",
      index: 1,
      desc: <TekmovanjeSkupine />,
    },
  ];
  return (
    <div className="bg-blue flex flex-col flex-1" id="demo">
      <div>
        <Header title={"Napredovanje"} />
      </div>
      <div className=" flex-1 flex flex-col">
        <div className="flex-1 flex flex-col mt-6">
          <Tabs value="on">
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
          <Button color="blue" className="w-full" placeholder={undefined}>
            Shrani
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Napredovanje;

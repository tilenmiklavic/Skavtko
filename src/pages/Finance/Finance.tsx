import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import Racuni from "../../components/Finance/racuni";
import Potni from "../../components/Finance/potni";
import Header from "../../components/Header/header";

export default function Finance() {
  const data = [
    {
      label: "Računi",
      value: "racuni",
      index: 0,
      desc: <Racuni />,
    },
    {
      label: "Potni",
      value: "potni",
      index: 1,
      desc: <Potni />,
    },
  ];

  return (
    <>
      <div>
        <Header title={"Finance"} />
      </div>
      <div className="bg-blue flex flex-col flex-1" id="demo">
        <div className=" flex-1 flex flex-col">
          <div className="flex-1 flex flex-col mt-6">
            <Tabs value="racuni">
              <TabsHeader placeholder={undefined}>
                {data.map(({ label, value, index }) => (
                  <Tab key={value} value={value} placeholder={undefined}>
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
        </div>
      </div>
    </>
  );
}

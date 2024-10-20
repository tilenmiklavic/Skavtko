import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import Potni from "../../components/Finance/potni";
import RacuniManual from "../../components/Finance/racuniManual";

export default function FinanceManual() {
  const data = [
    {
      label: "Računi",
      value: "racuni",
      index: 0,
      desc: <RacuniManual />,
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

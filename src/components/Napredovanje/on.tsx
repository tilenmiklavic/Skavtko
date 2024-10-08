import { useEffect, useState } from "react";
import { getSettings } from "../../services/settings";
import { getSheet, sheet2Object, writeToSheet } from "../../services/gsheets";
import Chart from "react-apexcharts";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import LoadingEmpty from "../Common/LoadingEmpty";
import UserNapredovanje from "../../classes/UserNapredovanje";
import ProgressBar from "../Common/ProgressBar";
import CheckBox from "../Inputs/checkBox";

const OsebnoNaprevanje = () => {
  const [settings] = useState(getSettings());
  const [napredovanjeData, setNapredovanjeData] = useState<any[]>([]);
  const [rawData, setRawData] = useState([[]] as string[][]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const getData = async () => {
    if (settings.napredovanje.id === "") return;

    let response = await getSheet(settings.napredovanje.id);
    setNapredovanjeData(sheet2Object(response.data.values));
    setRawData(response.data.values);
    setLoading(false);
  };

  const getProgress = (izzivi: number) => {
    return (izzivi / settings.napredovanje.izziviNumber) * 100;
  };

  useEffect(() => {
    getData();
  }, [settings]);

  if (loading) {
    return <LoadingEmpty settings={settings.napredovanje.id} />;
  }

  return (
    <div className="m-1">
      {napredovanjeData.map((user: UserNapredovanje) => {
        return (
          <Card placeholder={undefined} className="mb-2" key={user.Ime}>
            <CardBody placeholder={undefined}>
              <div>
                <Typography
                  variant="h6"
                  color="blue-gray"
                  placeholder={undefined}
                >
                  {user.Ime}
                </Typography>

                <div className="flex justify-between">
                  {Array.from(
                    { length: settings.napredovanje.izziviNumber },
                    (_, index) => (
                      <span
                        key={index}
                        className="bg-blue-600 h-10 m-2 rounded"
                      >
                        <CheckBox checked={index < user.Izzivi} />
                      </span>
                    ),
                  )}
                </div>

                <ProgressBar progress={getProgress(user.Izzivi)} />
              </div>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
};

export default OsebnoNaprevanje;

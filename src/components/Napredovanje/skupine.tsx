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

const TekmovanjeSkupine = () => {
  const [settings] = useState(getSettings());
  const [groupPoints, setGroupPoints] = useState<any[]>([]);
  const [rawData, setRawData] = useState([[]] as string[][]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const getData = async () => {
    if (settings.group.id === "") return;

    let response = await getSheet(settings.group.id);
    setGroupPoints(sheet2Object(response.data.values));
    setRawData(response.data.values);
    setLoading(false);
  };

  const points = (team: string): number => {
    for (let i = 0; i < rawData.length; i++) {
      if (rawData[i][0] === team) {
        return parseInt(rawData[i][1]);
      }
    }

    return -1;
  };

  const labels = () => {
    return groupPoints.map((team) => team?.Ime);
  };

  const values = () => {
    return groupPoints.map((team) => team?.Točke);
  };

  const updatePoints = async (team: string, increase: boolean) => {
    let temp = [...groupPoints];
    temp.forEach((row) => {
      if (row.Ime === team) {
        row.Točke = increase
          ? parseInt(row.Točke) + 1
          : parseInt(row.Točke) - 1;
      }
    });

    setGroupPoints(temp);
  };

  const saveData = async () => {
    setUpdating(true);

    toast
      .promise(
        saveSheet(), // The promise you are awaiting
        {
          loading: "Writing to sheets...", // Message shown during loading
          success: "Data written successfully!", // Message shown on success
          error: "Failed to write data.", // Message shown on error
        }
      )
      .then(() => {
        setUpdating(false);
      });
  };

  const saveSheet = async () => {
    // Use map to transform each team into a promise by calling writeToSheet
    const promises = groupPoints.map(async (team) => {
      let index = rawData.findIndex((row) => row[0] === team.Ime);
      // Await is not necessary here; just return the promise
      return writeToSheet(
        team.Točke.toString(),
        `B${index + 1}`,
        settings.group.id
      );
    });

    // Use Promise.all to wait for all promises to resolve
    await Promise.all(promises);
  };

  useEffect(() => {
    getData();
  }, [settings]);

  const chartConfig = {
    type: "bar" as "bar",
    height: 240,
    series: [
      {
        name: "Točke",
        data: values(),
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: labels(),
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };

  if (loading) {
    return <LoadingEmpty settings={settings.group.id} />;
    return <Chip color="amber" size="lg" value={"Loading..."} />;
  }

  return (
    <div className="m-1">
      <Card placeholder={undefined}>
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
          placeholder={undefined}
        >
          <div>
            <Typography variant="h6" color="blue-gray" placeholder={undefined}>
              Ognjena zastavica
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="px-2 pb-0" placeholder={undefined}>
          <Chart {...chartConfig} />
        </CardBody>
      </Card>

      {groupPoints?.map((user: any) => {
        return (
          <>
            <Card placeholder={undefined} className="mt-3" key={user.Ime}>
              <div className="p-5 flex flex-row justify-between content-center">
                <div>
                  <h5 className="text-2xl font-semibold">{user.Ime}</h5>
                </div>
                <div className="flex gap-2 items-center">
                  <IconButton
                    placeholder={undefined}
                    size="lg"
                    onClick={() => updatePoints(user.Ime, true)}
                  >
                    {" "}
                    <FontAwesomeIcon className="icon" size="xl" icon={faPlus} />
                  </IconButton>
                  <p className="text-2xl font-bold">{user.Točke}</p>
                  <IconButton
                    placeholder={undefined}
                    size="lg"
                    onClick={() => updatePoints(user.Ime, false)}
                  >
                    {" "}
                    <FontAwesomeIcon
                      className="icon"
                      size="xl"
                      icon={faMinus}
                    />
                  </IconButton>
                </div>
              </div>
            </Card>
          </>
        );
      })}

      <div className="mt-6 flex">
        <Button
          placeholder={undefined}
          onClick={saveData}
          className="w-full"
          loading={updating}
        >
          Shrani
        </Button>
      </div>
    </div>
  );
};

export default TekmovanjeSkupine;

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

const TekmovanjeSkupine = () => {
  const [settings, setSettings] = useState(getSettings());
  const [data, setData] = useState<any[]>([]);
  const [rawData, setRawData] = useState([[]] as string[][]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const getData = async () => {
    let response = await getSheet(settings.group.id);
    setData(sheet2Object(response.data.values));
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
    return data.map((team) => team?.Ime);
  };

  const values = () => {
    return data.map((team) => team?.Točke);
  };

  const updatePoints = async (team: string, increase: boolean) => {
    setUpdating(true);

    let index = rawData.findIndex((row) => row[0] === team);
    let pointsValue = points(team) + (increase ? 1 : -1);
    let response = await writeToSheet(
      pointsValue.toString(),
      `B${index + 1}`,
      settings.group.id
    );

    setUpdating(false);
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
              Bar Chart
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="px-2 pb-0" placeholder={undefined}>
          <Chart {...chartConfig} />
        </CardBody>
      </Card>

      {labels().map((user: any) => {
        return (
          <Card placeholder={undefined} className="mt-3" key={user}>
            <div className="p-5 flex flex-row justify-between content-center">
              <div>
                <h5 className="text-2xl font-semibold">{user}</h5>
              </div>
              <div className="flex gap-2 items-center">
                <Button
                  placeholder={undefined}
                  loading={updating}
                  size="lg"
                  onClick={() => updatePoints(user, true)}
                >
                  {" "}
                  <FontAwesomeIcon className="icon" size="xl" icon={faPlus} />
                </Button>
                <Button
                  placeholder={undefined}
                  loading={updating}
                  size="lg"
                  onClick={() => updatePoints(user, false)}
                >
                  {" "}
                  <FontAwesomeIcon className="icon" size="xl" icon={faMinus} />
                </Button>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default TekmovanjeSkupine;

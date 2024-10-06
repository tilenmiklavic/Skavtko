import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Typography,
} from "@material-tailwind/react";
import Header from "../../components/Header/header";
import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import { getSheet, sheet2Object } from "../../services/gsheets";
import {
  calculateMeetingAttendanceByUser,
  calculateMeetingAttendanceSum,
  meetingLabels,
} from "../../services/stats";
import Subtitle from "../../components/Text/Subtitle";
import LoadingEmpty from "../../components/Common/LoadingEmpty";
import { getSettings } from "../../services/settings";

export default function Statistics() {
  const [data, setData] = useState([["1"]]);
  const [rawData, setRawData] = useState([] as any[]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState(getSettings());

  const getData = async () => {
    if (settings.prisotnost.id === "") return;

    const result = await getSheet(settings.prisotnost.id);
    const obj = sheet2Object(result.data.values);
    setData(obj);
    setRawData(result.data.values);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [settings]);

  const meetingsChartConfig = {
    type: "line" as "line",
    height: 200,
    series: [
      {
        name: "Sales",
        data: calculateMeetingAttendanceSum(rawData),
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      stroke: {
        curve: "smooth" as "smooth",
        lineCap: "round" as "round",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      markers: {
        size: 0,
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
        categories: meetingLabels(rawData),
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

  const TABLE_HEAD = ["Ime", "Vod", "Priden", ""];

  const TABLE_ROWS = calculateMeetingAttendanceByUser(rawData);

  if (loading) {
    return <LoadingEmpty settings={settings.prisotnost.id} />;
    return <Chip color="amber" size="lg" value={"Loading..."} />;
  }

  return (
    <div className="bg-blue flex flex-col flex-1" id="demo">
      <div>
        <Header title={"Statistics"} />
      </div>
      <div>
        <Card placeholder={undefined}>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
            placeholder={undefined}
          >
            <div>
              <Subtitle title={"Udeležba na srečanjih"} />
            </div>
          </CardHeader>
          <CardBody className="px-2 pb-0" placeholder={undefined}>
            <Chart {...meetingsChartConfig} />
          </CardBody>
        </Card>

        <Card className=" w-full overflow-scroll mt-3" placeholder={undefined}>
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                      placeholder={undefined}
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map(
                ({ name, group, attendance, percentage }, index) => (
                  <tr key={name} className="even:bg-blue-gray-50/50">
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        placeholder={undefined}
                      >
                        {name}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        placeholder={undefined}
                      >
                        {group}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        placeholder={undefined}
                      >
                        {attendance}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                        placeholder={undefined}
                      >
                        <Chip
                          variant="ghost"
                          color={
                            percentage > 80
                              ? "green"
                              : percentage >= 50
                                ? "amber"
                                : "red"
                          }
                          size="sm"
                          value={percentage.toFixed(0) + "%"}
                        />
                      </Typography>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}

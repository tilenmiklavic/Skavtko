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
  numberOfMeetings,
} from "../../services/stats";
import Subtitle from "../../components/Text/Subtitle";
import LoadingEmpty from "../../components/Common/LoadingEmpty";
import { getSettings } from "../../services/settings";
import { hasVod } from "../../services/data";
import Attendance from "../../classes/Attendance";

export default function Statistics() {
  const [data, setData] = useState([["1"]]);
  const [rawData, setRawData] = useState([] as any[]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState(getSettings());
  const [tableData, setTableData] = useState([] as Attendance[]);
  const [ascending, setAscending] = useState(true);

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
    const tempTableData = calculateMeetingAttendanceByUser(rawData);
    setTableData(tempTableData);
  }, [settings]);

  useEffect(() => {
    const tempTableData = calculateMeetingAttendanceByUser(rawData);
    setTableData(tempTableData);
  }, [rawData]);

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

  const TABLE_HEAD = ["Ime", "Priden"];
  hasVod(data) && TABLE_HEAD.splice(1, 0, "Vod");

  const sortTable = (index: number): any => {
    let sortedTableData;

    switch (index) {
      case 0:
        sortedTableData = [...tableData].sort((a, b) =>
          ascending
            ? b.name.localeCompare(a.name)
            : a.name.localeCompare(b.name),
        );
        break;
      case 1:
        sortedTableData = [...tableData].sort((a, b) =>
          ascending
            ? b.group.localeCompare(a.group)
            : a.group.localeCompare(b.group),
        );
        break;
      case 2:
        sortedTableData = [...tableData].sort((a, b) =>
          ascending ? a.attendance - b.attendance : b.attendance - a.attendance,
        );
        break;
      default:
        console.log(`Sorry, we are out of`);
    }

    setTableData(sortedTableData || []);
    setAscending(!ascending);
    return null;
  };

  if (loading) {
    return <LoadingEmpty settings={settings.prisotnost.id} tab={3} />;
  }

  return (
    <div className="bg-blue flex flex-col flex-1" id="demo">
      <div>
        <Header title={"Statistika"} />
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
          <table className="w-full table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    onClick={() => sortTable(index)}
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
              {tableData.map(
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
                    {group && (
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
                    )}
                    <td className="p-4 w-1/4">
                      <div className="justify-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal text-center"
                          placeholder={undefined}
                        >
                          {attendance} / {numberOfMeetings(rawData)}
                        </Typography>
                        <Chip
                          className="justify-items-center"
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
                      </div>
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

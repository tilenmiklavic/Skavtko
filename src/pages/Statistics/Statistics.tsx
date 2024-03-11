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
  calculateMeetingAttendanceSum,
  meetingLabels,
} from "../../services/stats";
import Subtitle from "../../components/Text/Subtitle";

export default function Statistics() {
  const [sheetId, setSheetId] = useState("");
  const [data, setData] = useState([["1"]]);
  const [rawData, setRawData] = useState([] as any[]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    if (sheetId === "") return;

    const result = await getSheet(sheetId);
    const obj = sheet2Object(result.data.values);
    setData(obj);
    setRawData(result.data.values);
    setLoading(false);
  };

  useEffect(() => {
    const sheetId = JSON.parse(localStorage.getItem("settings")!).prisotnost.id;
    setSheetId(sheetId);
  }, []);

  useEffect(() => {
    getData();
  }, [sheetId]);

  const chartConfig = {
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

  if (loading) {
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
            <Chart {...chartConfig} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

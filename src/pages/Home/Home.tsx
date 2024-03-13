import { useEffect, useState } from "react";
import {
  appendHeaderItem,
  date2Col,
  getSheet,
  name2RowNumber,
  sheet2Object,
  writeToSheet,
} from "../../services/gsheets";
import { Alert, Button, Card, IconButton } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarPlus,
  faCircle,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header/header";
import Present from "../../classes/Present";
import moment from "moment";
import { getSettings } from "../../services/settings";
import LoadingEmpty from "../../components/Common/LoadingEmpty";
import toast from "react-hot-toast";

function Home() {
  const [data, setData] = useState([1, 1, 2]);
  const [rawData, setRawData] = useState([] as any[]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState(getSettings());
  const [date, setDate] = useState(moment().format("D.M.YYYY"));
  const [today, setToday] = useState(false);

  const getData = async () => {
    if (settings.prisotnost.id === "") return;

    const result = await getSheet(settings.prisotnost.id);
    const obj = sheet2Object(result.data.values);
    setData(obj);
    setRawData(result.data.values);
    setLoading(false);
    setToday(result.data.values[0].includes(date));
  };

  const markPresent = async (present: Present, user: string) => {
    const symbol =
      present === Present.present
        ? "x"
        : present === Present.absent
        ? "/"
        : "o";
    const response = await writeToSheet(
      symbol,
      date2Col(rawData, date) + name2RowNumber(rawData, user),
      settings.prisotnost.id
    );
  };

  const addDate = async () => {
    toast
      .promise(
        appendHeaderItem(settings.prisotnost.id, rawData, date), // The promise you are awaiting
        {
          loading: "Adding date...", // Message shown during loading
          success: "Date added successfully!", // Message shown on success
          error: "Failed to add date.", // Message shown on error
        }
      )
      .then(() => getData());
  };

  useEffect(() => {
    getData();
  }, [settings]);

  if (loading) {
    return (
      <>
        <LoadingEmpty settings={settings.prisotnost.id} />
      </>
    );
  }

  return (
    <div>
      <div>
        <Header title={"Prisotnost"} />
      </div>

      {!today && (
        <Alert
          variant="filled"
          className="mb-5"
          icon={<FontAwesomeIcon icon={faCalendarPlus} />}
          color="amber"
          action={
            <Button
              variant="text"
              color="black"
              size="sm"
              className="!absolute top-3 right-3"
              onClick={() => addDate()}
              placeholder={undefined}
            >
              Add
            </Button>
          }
        >
          Date not in sheet
        </Alert>
      )}

      <div className="flex flex-col gap-2">
        {data.map((user: any) => {
          return (
            <Card
              placeholder={undefined}
              key={user.Ime}
              className="shadow-xl border"
            >
              <div className="p-5 flex flex-row justify-between">
                <div>
                  <h5 className="text-2xl font-semibold">{user.Ime}</h5>
                  <p className="mt-2 text-gray-500">{user.Vod}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <IconButton
                    placeholder={undefined}
                    size="lg"
                    onClick={() => markPresent(Present.present, user.Ime)}
                    disabled={!today}
                  >
                    <FontAwesomeIcon
                      className="icon"
                      size="xl"
                      icon={faCircleCheck}
                    />
                  </IconButton>
                  <IconButton
                    placeholder={undefined}
                    size="lg"
                    onClick={() => markPresent(Present.unknown, user.Ime)}
                    disabled={!today}
                  >
                    <FontAwesomeIcon
                      className="icon"
                      size="xl"
                      icon={faCircle}
                    />
                  </IconButton>
                  <IconButton
                    placeholder={undefined}
                    size="lg"
                    onClick={() => markPresent(Present.absent, user.Ime)}
                    disabled={!today}
                  >
                    <FontAwesomeIcon
                      className="icon"
                      size="xl"
                      icon={faCircleXmark}
                    />
                  </IconButton>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default Home;

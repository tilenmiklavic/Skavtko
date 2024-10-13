import { useEffect, useState, useRef } from "react";
import {
  appendHeaderItem,
  appendToSheet,
  colNumber2ColLetter,
  date2Col,
  getSheet,
  name2ColIndex,
  name2RowNumber,
  removeRow,
  sheet2Object,
  vod2ColIndex,
  writeToSheet,
} from "../../services/gsheets";
import { Alert, Button, Card, IconButton } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarPlus,
  faCircle,
  faCircleCheck,
  faCircleXmark,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header/header";
import Present from "../../classes/Present";
import moment from "moment";
import { getSettings } from "../../services/settings";
import LoadingEmpty from "../../components/Common/LoadingEmpty";
import toast from "react-hot-toast";
import {
  color2Text,
  symbol2Description,
  symbol2color,
} from "../../services/attendance";
import DateInput from "../../components/Inputs/dateInput";
import TextInput from "../../components/Inputs/textInput";
import { useLongPress } from "@uidotdev/usehooks";
import ConfirmDialog from "../../components/Common/ConfirmDialog";
import LongPressCard from "../../components/Card/LongPressCard";
import User from "../../classes/User";

function Home() {
  const [data, setData] = useState([] as any[]);
  const [rawData, setRawData] = useState([] as any[]);
  const [loading, setLoading] = useState(true);
  const [settings] = useState(getSettings());
  const [date, setDate] = useState(moment().format("D.M.YYYY"));
  const [today, setToday] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editedUserName, setEditedUserName] = useState("");
  const [editedUserVod, setEditedUserVod] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const getData = async () => {
    if (settings.prisotnost.id === "") return;

    const result = await getSheet(settings.prisotnost.id);
    const obj = sheet2Object(result.data.values);
    setData(obj);
    setRawData(result.data.values);
    setLoading(false);
    setToday(result.data?.values?.[0]?.includes(date) ?? false);
  };

  const markPresent = async (present: Present, user: string) => {
    const symbol =
      present === Present.present
        ? settings.symbols.present
        : present === Present.absent
          ? settings.symbols.absent
          : settings.symbols.excused;
    const response = await writeToSheet(
      settings.prisotnost.id,
      [[symbol]],
      `${date2Col(rawData, date) + name2RowNumber(rawData, user)}:${
        date2Col(rawData, date) + name2RowNumber(rawData, user)
      }`,
      "ROWS",
    );

    const obj = sheet2Object(response.data.values);
    setData(obj);
    setRawData(response.data.values);
  };

  const checkPresent = () => {
    let tempData = [...data];

    tempData.forEach((user: any) => {
      user.present = symbol2Description(user[date], settings);
      user.presentColor = symbol2color(user[date], settings);
      user.textColor = color2Text(user.presentColor);
    });

    setData(tempData);
  };

  const addDate = async () => {
    toast
      .promise(
        appendHeaderItem(settings.prisotnost.id, rawData, date), // The promise you are awaiting
        {
          loading: "Adding date...", // Message shown during loading
          success: "Date added successfully!", // Message shown on success
          error: "Failed to add date.", // Message shown on error
        },
      )
      .then(() => getData());
  };

  const changeDate = (e: any) => {
    const newDate = moment(e.target.value).format("D.M.YYYY");
    setDate(newDate);
  };

  const addUser = async (name: string) => {
    toast
      .promise(
        appendToSheet([[name]], settings.prisotnost.id), // The promise you are awaiting
        {
          loading: "Adding user...", // Message shown during loading
          success: "User added successfully!", // Message shown on success
          error: "Failed to add user.", // Message shown on error
        },
      )
      .then(() => {
        getData();
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      });
  };

  const editUser = async (origin_name: string, name: string, vod: string) => {
    console.log("Editing user", name, vod);
    console.log(name2RowNumber(rawData, origin_name));

    let row_index = name2RowNumber(rawData, origin_name);
    let name_col_index = name2ColIndex(rawData);
    let vod_col_index = vod2ColIndex(rawData);
    let name_col_letter = colNumber2ColLetter(name_col_index);
    let vod_col_letter = colNumber2ColLetter(vod_col_index);

    toast
      .promise(
        writeToSheet(
          settings.prisotnost.id,
          [[name]],
          `${name_col_letter}${row_index}:${name_col_letter}${row_index}`,
          "ROWS",
        ), // The promise you are awaiting
        {
          loading: "Editing name...", // Message shown during loading
          success: "Name edited successfully!", // Message shown on success
          error: "Failed to edit name.", // Message shown on error
        },
      )
      .then(() => {
        toast
          .promise(
            writeToSheet(
              settings.prisotnost.id,
              [[vod]],
              `${vod_col_letter}${row_index}:${vod_col_letter}${row_index}`,
              "ROWS",
            ), // The promise you are awaiting
            {
              loading: "Editing vod...", // Message shown during loading
              success: "Vod edited successfully!", // Message shown on success
              error: "Failed to edit vod.", // Message shown on error
            },
          )
          .then(() => getData());
      });
  };

  const removeUser = async (name: string) => {
    console.log("Removing user", name);
    let row_index = name2RowNumber(rawData, name);

    toast
      .promise(
        removeRow(settings.prisotnost.id, row_index), // The promise you are awaiting
        {
          loading: "Removing user...", // Message shown during loading
          success: "User removed successfully!", // Message shown on success
          error: "Failed to remove user.", // Message shown on error
        },
      )
      .then(() => getData());
  };

  useEffect(() => {
    getData();
  }, [settings]);

  useEffect(() => {
    if (rawData.length === 0) return;

    setToday(rawData[0].includes(date));
  }, [date]);

  useEffect(() => {
    checkPresent();
  }, [rawData, date]);

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

      <DateInput
        label={"Datum"}
        id={"date_input"}
        placeholder={"dd. mm. yyyy"}
        onChange={(e) => changeDate(e)}
      />

      <div className="flex flex-col gap-2 mt-5">
        {data.map((user: User) => {
          return (
            <LongPressCard
              placeholder={undefined}
              key={user.ime}
              data={user}
              className="shadow-xl border"
              style={{ backgroundColor: user.presentColor }}
              variant="gradient"
              onSave={(origin_name: string, name: string, vod: string) =>
                editUser(origin_name, name, vod)
              }
              onRemove={(name: string) => removeUser(name)}
            >
              <div className="p-5 flex flex-row justify-between">
                <div>
                  <h5
                    className="text-2xl font-semibold"
                    id="user_name"
                    style={{ color: user.textColor }}
                  >
                    {user.ime}
                  </h5>
                  <p className="mt-2" style={{ color: user.textColor }}>
                    {user.vod}
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <IconButton
                    placeholder={undefined}
                    size="lg"
                    onClick={() => markPresent(Present.present, user.ime)}
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
                    onClick={() => markPresent(Present.unknown, user.ime)}
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
                    onClick={() => markPresent(Present.absent, user.ime)}
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
            </LongPressCard>
          );
        })}
        <Card
          placeholder={undefined}
          className="shadow-xl border"
          variant="gradient"
        >
          <div className="p-5 flex flex-row justify-between">
            <div>
              <h5 className="text-xl font-semibold">Nov uporabnik</h5>
              <TextInput
                id={"new_user_input"}
                placeholder={"ime priimek"}
                className="mt-2"
                ref={inputRef}
              />
            </div>
            <div className="flex gap-2 items-center">
              <IconButton
                placeholder={undefined}
                size="lg"
                onClick={() => {
                  if (inputRef.current) {
                    addUser(inputRef.current.value);
                  }
                }}
              >
                <FontAwesomeIcon
                  className="icon"
                  size="xl"
                  icon={faPlusCircle}
                />
              </IconButton>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Home;

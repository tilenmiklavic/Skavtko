import { useEffect, useState } from "react";
import { formatSheet, getSheetInfo } from "../../services/gsheets";
import TextInput from "../Inputs/textInput";
import Subtitle from "../Text/Subtitle";
import SettingsInterface from "../../classes/SettingsInterface";
import { Button, Chip } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { FormatedSheet } from "../../classes/FormatedSheet";

const PrisotnostSettings = () => {
  const [settings, setSettings] = useState({} as SettingsInterface);
  const [sheetInfoData, setSheetInfoData] = useState({} as any);
  const [loading, setLoading] = useState(true);

  const sheetInfo = async () => {
    const sheetInfo = await getSheetInfo(settings.prisotnost.id);
    setSheetInfoData(sheetInfo?.data);
    setLoading(false);
  };

  const format = async () => {
    toast.promise(
      formatSheet(settings.prisotnost.id, FormatedSheet.PRISOTNOST), // The promise you are awaiting
      {
        loading: "Formatting sheet...", // Message shown during loading
        success: "Sheet formatted successfully!", // Message shown on success
        error: "Failed to format sheet.", // Message shown on error
      }
    );
  };

  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem("settings")!);
    setSettings(settings);
  }, []);

  useEffect(() => {
    if (settings.racuni) {
      sheetInfo();
    }
  }, [settings]);

  return (
    <div>
      <Subtitle title="Prisotnost" />
      <TextInput
        label="Spreadsheet link"
        placeholder="link"
        id="prisotnost_input"
      />

      {settings?.prisotnost?.link ? (
        // <span>Current: {sheetInfoData?.properties?.title}</span>
        <div className="flex gap-2 items-center">
          {loading && <Chip color="amber" value={"Loading..."} />}
          {!loading && (
            <div className="flex flex-row w-screen justify-between">
              <div className="flex flex-row items-center">
                <span className="mr-2">Current: </span>
                <Chip color="green" value={sheetInfoData?.properties?.title} />
              </div>
              <Button size="sm" onClick={format} placeholder={undefined}>
                Format
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Chip color="amber" value={"No spreadsheet"} />
      )}
    </div>
  );
};

export default PrisotnostSettings;

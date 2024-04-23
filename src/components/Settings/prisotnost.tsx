import { useEffect, useState } from "react";
import { formatSheet, getSheetInfo } from "../../services/gsheets";
import TextInput from "../Inputs/textInput";
import Subtitle from "../Text/Subtitle";
import SettingsInterface from "../../classes/SettingsInterface";
import { Button, Chip } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { FormatedSheet } from "../../classes/FormatedSheet";
import SheetInfo from "../Common/SheetInfo";

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

      <SheetInfo
        loading={loading}
        title={sheetInfoData?.properties?.title}
        index={FormatedSheet.PRISOTNOST}
        sheet_id={settings?.prisotnost?.id}
        link="settings?.prisotnost?.link"
      />
    </div>
  );
};

export default PrisotnostSettings;

import { useEffect, useState } from "react";
import TextInput from "../Inputs/textInput";
import Subtitle from "../Text/Subtitle";
import SettingsInterface from "../../classes/SettingsInterface";
import { getSheetInfo } from "../../services/gsheets";
import { Chip } from "@material-tailwind/react";

const PotniSettings = () => {
  const [settings, setSettings] = useState({} as SettingsInterface);
  const [sheetInfoData, setSheetInfoData] = useState({} as any);
  const [loading, setLoading] = useState(true);

  const sheetInfo = async () => {
    const sheetInfo = await getSheetInfo(settings.potni.id);
    setSheetInfoData(sheetInfo.data);
    setLoading(false);
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
      <Subtitle title="Potni stroški" />
      <TextInput label="Spreadsheet link" placeholder="link" id="potni_input" />

      {settings?.potni?.link ? (
        // <span>Current: {sheetInfoData?.properties?.title}</span>
        <div className="flex gap-2 items-center">
          {loading && <Chip color="amber" value={"Loading..."} />}
          {!loading && (
            <>
              <span>Current: </span>
              <Chip color="green" value={sheetInfoData?.properties?.title} />
            </>
          )}
        </div>
      ) : (
        <Chip color="amber" value={"No sheet"} />
      )}
    </div>
  );
};

export default PotniSettings;

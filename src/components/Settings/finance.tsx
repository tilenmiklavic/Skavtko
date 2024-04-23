import { useEffect, useState } from "react";
import { getSheetInfo } from "../../services/gsheets";
import Subtitle from "../Text/Subtitle";
import TextInput from "../Inputs/textInput";
import { Button, Chip, Input } from "@material-tailwind/react";
import Horizontal from "../Lines/Horizontal";
import { getSettings } from "../../services/settings";
import SheetInfo from "../Common/SheetInfo";
import { FormatedSheet } from "../../classes/FormatedSheet";

const FinanceSettings = () => {
  const [settings] = useState(getSettings());
  const [racuniSheetInfoData, setRacuniSheetInfoData] = useState({} as any);
  const [potniSheetInfoData, setPotniSheetInfoData] = useState({} as any);
  const [loading, setLoading] = useState(true);

  const racuniSheetInfo = async () => {
    const sheetInfoRacuni = await getSheetInfo(settings.racuni.id);
    setRacuniSheetInfoData(sheetInfoRacuni.data);
    const sheetInfoPotni = await getSheetInfo(settings.potni.id);
    setPotniSheetInfoData(sheetInfoPotni?.data);
    setLoading(false);
  };

  const formatSheet = async () => {
    // TODO
    console.log("format");
  };

  useEffect(() => {
    if (settings.racuni) {
      racuniSheetInfo();
    }
  }, [settings]);

  return (
    <div>
      <Subtitle title="Računi" />
      <TextInput
        label="Spreadsheet link"
        placeholder="link"
        id="racuni_input"
      />

      <SheetInfo
        loading={loading}
        title={racuniSheetInfoData?.properties?.title}
        index={FormatedSheet.RACUNI}
        sheet_id={settings.racuni.id}
        link={settings?.racuni?.link}
      />

      <Horizontal />

      <Subtitle title="Potni stroški" />
      {/* <Input crossOrigin={undefined} id="racuni_input" required={false} /> */}
      <TextInput label="Spreadsheet link" placeholder="link" id="potni_input" />

      <SheetInfo
        loading={loading}
        title={potniSheetInfoData?.properties?.title}
        index={FormatedSheet.POTNI}
        sheet_id={settings.potni.id}
        link={settings?.potni?.link}
      />
    </div>
  );
};

export default FinanceSettings;

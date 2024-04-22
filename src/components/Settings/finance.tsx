import { useEffect, useState } from "react";
import { getSheetInfo } from "../../services/gsheets";
import Subtitle from "../Text/Subtitle";
import TextInput from "../Inputs/textInput";
import { Button, Chip, Input } from "@material-tailwind/react";
import Horizontal from "../Lines/Horizontal";
import { getSettings } from "../../services/settings";

const FinanceSettings = () => {
  const [settings] = useState(getSettings());
  const [racuniSheetInfoData, setRacuniSheetInfoData] = useState({} as any);
  const [potniSheetInfoData, setPotniSheetInfoData] = useState({} as any);
  const [loading, setLoading] = useState(true);

  const racuniSheetInfo = async () => {
    const sheetInfoRacuni = await getSheetInfo(settings.racuni.id);
    setRacuniSheetInfoData(sheetInfoRacuni.data);
    const sheetInfoPotni = await getSheetInfo(settings.potni.id);
    setPotniSheetInfoData(sheetInfoPotni.data);
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

      {settings?.racuni?.link ? (
        // <span>Current: {sheetInfoData?.properties?.title}</span>
        <div className="flex gap-2 items-center">
          {loading && <Chip color="amber" value={"Loading..."} />}
          {!loading && (
            <>
              <span>Current: </span>
              <Chip
                color="green"
                value={racuniSheetInfoData?.properties?.title}
              />
              <Button placeholder={undefined} size="sm" onClick={formatSheet}>
                Format
              </Button>
            </>
          )}
        </div>
      ) : (
        <Chip color="amber" value={"No spreadsheet"} />
      )}

      <Horizontal />

      <Subtitle title="Potni stroški" />
      {/* <Input crossOrigin={undefined} id="racuni_input" required={false} /> */}
      <TextInput label="Spreadsheet link" placeholder="link" id="potni_input" />

      {settings?.potni?.link ? (
        // <span>Current: {sheetInfoData?.properties?.title}</span>
        <div className="flex gap-2 items-center">
          {loading && <Chip color="amber" value={"Loading..."} />}
          {!loading && (
            <>
              <span>Current: </span>

              <Chip
                color="green"
                value={potniSheetInfoData?.properties?.title}
              />
              <Button placeholder={undefined} size="sm">
                Format
              </Button>
            </>
          )}
        </div>
      ) : (
        <Chip color="amber" value={"No spreadsheet"} />
      )}
    </div>
  );
};

export default FinanceSettings;

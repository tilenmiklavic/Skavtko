import { useEffect, useState } from "react";
import { getSheetInfo } from "../../services/gsheets";
import Subtitle from "../Text/Subtitle";
import TextInput from "../Inputs/textInput";
import { Chip, Input } from "@material-tailwind/react";
import Horizontal from "../Lines/Horizontal";
import { getSettings } from "../../services/settings";

const NapredovanjeSettings = () => {
  const [settings, setSettings] = useState(getSettings());
  const [napredovanjeSheetInfoData, setNapredovanjeSheetInfoData] = useState(
    {} as any
  );
  const [groupSheetInfoData, setGroupSheetInfoData] = useState({} as any);
  const [loading, setLoading] = useState(true);

  const napredovanjeSheetInfo = async () => {
    const sheetInfoNapredovanje = await getSheetInfo(settings.napredovanje.id);
    setNapredovanjeSheetInfoData(sheetInfoNapredovanje.data);
    const sheetInfoGroup = await getSheetInfo(settings.group.id);
    setGroupSheetInfoData(sheetInfoGroup?.data);
    setLoading(false);
  };

  useEffect(() => {
    if (settings.napredovanje) {
      napredovanjeSheetInfo();
    }
  }, [settings]);

  return (
    <div>
      <Subtitle title="Osebno napredovanje" />
      <TextInput
        label="Spreadsheet link"
        placeholder="link"
        id="napredovanje_input"
      />

      {settings?.napredovanje?.link ? (
        // <span>Current: {sheetInfoData?.properties?.title}</span>
        <div className="flex gap-2 items-center">
          {loading && <Chip color="amber" value={"Loading..."} />}
          {!loading && (
            <>
              <span>Current: </span>
              <Chip
                color="green"
                value={napredovanjeSheetInfoData?.properties?.title}
              />
            </>
          )}
        </div>
      ) : (
        <Chip color="amber" value={"No spreadsheet"} />
      )}

      <Horizontal />

      <Subtitle title="Tekmovanje med vodi" />
      <TextInput label="Spreadsheet link" placeholder="link" id="group_input" />

      {settings?.group?.link ? (
        // <span>Current: {sheetInfoData?.properties?.title}</span>
        <div className="flex gap-2 items-center">
          {loading && <Chip color="amber" value={"Loading..."} />}
          {!loading && (
            <>
              <span>Current: </span>
              <Chip
                color="green"
                value={groupSheetInfoData?.properties?.title}
              />
            </>
          )}
        </div>
      ) : (
        <Chip color="amber" value={"No spreadsheet"} />
      )}
    </div>
  );
};

export default NapredovanjeSettings;

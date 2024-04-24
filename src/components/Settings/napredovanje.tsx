import { useEffect, useState } from "react";
import { getSheetInfo } from "../../services/gsheets";
import Subtitle from "../Text/Subtitle";
import TextInput from "../Inputs/textInput";
import Horizontal from "../Lines/Horizontal";
import { getSettings } from "../../services/settings";
import SheetInfo from "../Common/SheetInfo";
import { FormatedSheet } from "../../classes/FormatedSheet";

const NapredovanjeSettings = () => {
  const [settings] = useState(getSettings());
  const [napredovanjeSheetInfoData, setNapredovanjeSheetInfoData] = useState(
    {} as any
  );
  const [groupSheetInfoData, setGroupSheetInfoData] = useState({} as any);
  const [loading, setLoading] = useState(true);

  const napredovanjeSheetInfo = async () => {
    const sheetInfoNapredovanje = await getSheetInfo(settings.napredovanje.id);
    setNapredovanjeSheetInfoData(sheetInfoNapredovanje.data);
    setLoading(false);
  };

  const groupSheetInfo = async () => {
    const sheetInfoGroup = await getSheetInfo(settings.group.id);
    setGroupSheetInfoData(sheetInfoGroup?.data);
    setLoading(false);
  };

  useEffect(() => {
    if (settings.napredovanje) napredovanjeSheetInfo();
    if (settings.group) groupSheetInfo();
  }, [settings]);

  return (
    <div>
      <Subtitle title="Osebno napredovanje" />
      <TextInput
        label="Spreadsheet link"
        placeholder="link"
        id="napredovanje_input"
      />

      <SheetInfo
        loading={loading}
        title={napredovanjeSheetInfoData?.properties?.title}
        index={FormatedSheet.ON}
        sheet_id={settings?.napredovanje?.id}
        link={settings?.napredovanje?.link}
      />

      <Horizontal />

      <Subtitle title="Tekmovanje med vodi" />
      <TextInput label="Spreadsheet link" placeholder="link" id="group_input" />

      <SheetInfo
        loading={loading}
        title={groupSheetInfoData?.properties?.title}
        index={FormatedSheet.SKUPINE}
        sheet_id={settings?.group?.id}
        link={settings?.group?.link}
      />
    </div>
  );
};

export default NapredovanjeSettings;

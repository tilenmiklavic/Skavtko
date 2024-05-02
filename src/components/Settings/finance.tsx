import { useEffect, useState } from "react";
import { createSheet, formatSheet, getSheetInfo } from "../../services/gsheets";
import Subtitle from "../Text/Subtitle";
import Horizontal from "../Lines/Horizontal";
import { getSettings, saveSettings } from "../../services/settings";
import SheetInfo from "../Common/SheetInfo";
import { FormatedSheet } from "../../classes/FormatedSheet";
import TextInputButton from "../Inputs/textInputButton";
import toast from "react-hot-toast";
import { getSheets } from "../../services/drive";
import Select from "../Inputs/select";

const FinanceSettings = () => {
  const [settings] = useState(getSettings());
  const [racuniSheetInfoData, setRacuniSheetInfoData] = useState({} as any);
  const [potniSheetInfoData, setPotniSheetInfoData] = useState({} as any);
  const [loading, setLoading] = useState(true);
  const [sheets, setSheets] = useState([] as any[]);
  const [potniSheetSelectId, setPotniSheetSelectId] = useState("");
  const [racuniSheetSelectId, setRacuniSheetSelectId] = useState("");

  const racuniSheetInfo = async () => {
    const sheetInfoRacuni = await getSheetInfo(settings.racuni.id);
    setRacuniSheetInfoData(sheetInfoRacuni.data);
    const sheetInfoPotni = await getSheetInfo(settings.potni.id);
    setPotniSheetInfoData(sheetInfoPotni?.data);
    setLoading(false);
  };

  const getFiles = async () => {
    const foo = await getSheets();
    setSheets(foo);
  };

  useEffect(() => {
    getFiles();
    if (settings.racuni) {
      racuniSheetInfo();
    }
  }, [settings]);

  const createNewRacuniSheet = async (title?: string) => {
    const result = await createSheet(title || "Računi");
    await formatSheet(result.data.spreadsheetId, FormatedSheet.RACUNI);

    if (result?.data) {
      settings.racuni = {
        id: result.data.spreadsheetId,
        link: result.data.spreadsheetUrl,
      };
      saveSettings(settings);
      racuniSheetInfo();
    }
  };

  const createNewPotniSheet = async (title?: string) => {
    const result = await createSheet(title || "Potni");
    const table = await formatSheet(
      result.data.spreadsheetId,
      FormatedSheet.POTNI
    );

    if (result?.data) {
      settings.potni = {
        id: result.data.spreadsheetId,
        link: result.data.spreadsheetUrl,
      };
      saveSettings(settings);
      racuniSheetInfo();
    }
  };

  const sheetSelectionChange = (id: any) => {
    console.log("selection change", id);
  };

  return (
    <div>
      <Subtitle title="Računi" />

      <TextInputButton
        label={"Spreadsheet link"}
        id={"racuni_input"}
        placeholder={"link"}
        onButtonClick={(title?: string) => {
          toast.promise(
            createNewRacuniSheet(title), // The promise you are awaiting
            {
              loading: "Creating new sheet...", // Message shown during loading
              success: "Sheet created successfully!", // Message shown on success
              error: "Failed to create sheet.", // Message shown on error
            }
          );
        }}
      />

      <div className="mb-3">
        <Select
          label="or select"
          placeholder=""
          id="racuni_sheet_select"
          options={sheets}
        ></Select>
      </div>

      <SheetInfo
        loading={loading}
        title={racuniSheetInfoData?.properties?.title}
        index={FormatedSheet.RACUNI}
        sheet_id={settings.racuni.id}
        link={settings?.racuni?.link}
        format={true}
      />

      <Horizontal />

      <Subtitle title="Potni stroški" />
      <TextInputButton
        label={"Spreadsheet link"}
        id={"potni_input"}
        placeholder={"link"}
        onButtonClick={(title?: string) => {
          toast.promise(
            createNewPotniSheet(title), // The promise you are awaiting
            {
              loading: "Creating new sheet...", // Message shown during loading
              success: "Sheet created successfully!", // Message shown on success
              error: "Failed to create sheet.", // Message shown on error
            }
          );
        }}
      />
      <div className="mb-3">
        <Select
          label="or select"
          placeholder=""
          id="potni_sheet_select"
          options={sheets}
        ></Select>
      </div>

      <SheetInfo
        loading={loading}
        title={potniSheetInfoData?.properties?.title}
        index={FormatedSheet.POTNI}
        sheet_id={settings.potni.id}
        link={settings?.potni?.link}
        format={true}
      />
    </div>
  );
};

export default FinanceSettings;

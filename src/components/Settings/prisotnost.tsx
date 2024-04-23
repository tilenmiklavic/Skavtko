import { useEffect, useState } from "react";
import { formatSheet, getSheetInfo } from "../../services/gsheets";
import TextInput from "../Inputs/textInput";
import Subtitle from "../Text/Subtitle";
import SettingsInterface from "../../classes/SettingsInterface";
import { Button, Chip, Dialog } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { FormatedSheet } from "../../classes/FormatedSheet";
import SheetInfo from "../Common/SheetInfo";
import ConfirmDialog from "../Common/ConfirmDialog";
import Horizontal from "../Lines/Horizontal";
import { propTypesSelected } from "@material-tailwind/react/types/components/select";
import ColorInput from "../Inputs/colorInput";
import { getSettings } from "../../services/settings";

const PrisotnostSettings = () => {
  const [settings, setSettings] = useState(getSettings());
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

      <Horizontal />

      <TextInput
        label="Prisoten simbol"
        placeholder={settings?.symbols?.present || "prisoten"}
        id="present_symbol_input"
      />

      <TextInput
        label="Opravičen simbol"
        placeholder={settings?.symbols?.excused || "opravičen"}
        id="excused_symbol_input"
      />

      <TextInput
        label="Odsoten simbol"
        placeholder={settings?.symbols?.absent || "odsoten"}
        id="absent_symbol_input"
      />

      <Horizontal />

      <div className="mb-3">
        <div className="flex flex-row justify-between">
          <ColorInput
            label={"Prisoten"}
            id={"present_color_input"}
            defaultValue={settings.colors.present}
          />
          <ColorInput
            label={"Opravičen"}
            id={"excused_color_input"}
            defaultValue={settings.colors.excused}
          />
          <ColorInput
            label={"Odsoten"}
            id={"absent_color_input"}
            defaultValue={settings.colors.absent}
          />
        </div>
      </div>

      <Horizontal />
    </div>
  );
};

export default PrisotnostSettings;

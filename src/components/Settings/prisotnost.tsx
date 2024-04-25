import { useEffect, useState } from "react";
import { getSheetInfo } from "../../services/gsheets";
import TextInput from "../Inputs/textInput";
import Subtitle from "../Text/Subtitle";
import { FormatedSheet } from "../../classes/FormatedSheet";
import SheetInfo from "../Common/SheetInfo";
import Horizontal from "../Lines/Horizontal";
import ColorInput from "../Inputs/colorInput";
import { getSettings } from "../../services/settings";
import TextInputButton from "../Inputs/textInputButton";

const PrisotnostSettings = () => {
  const [settings] = useState(getSettings());
  const [sheetInfoData, setSheetInfoData] = useState({} as any);
  const [loading, setLoading] = useState(true);

  const sheetInfo = async () => {
    const sheetInfo = await getSheetInfo(settings.prisotnost.id);
    setSheetInfoData(sheetInfo?.data);
    setLoading(false);
  };

  const createSheet = () => {};

  useEffect(() => {
    if (settings.racuni) {
      sheetInfo();
    }
  }, [settings]);

  return (
    <div>
      <div>
        <Subtitle title="Prisotnost" />

        <TextInputButton
          label="Spreadsheet link"
          placeholder="link"
          id="prisotnost_input"
          onButtonClick={() => {
            createSheet();
          }}
        />

        <SheetInfo
          loading={loading}
          title={sheetInfoData?.properties?.title}
          index={FormatedSheet.PRISOTNOST}
          sheet_id={settings?.prisotnost?.id}
          link={settings?.prisotnost?.link}
          format={true}
        />
      </div>

      <Horizontal />

      <div>
        <Subtitle title="Simboli" />

        <TextInput
          label="Prisoten simbol"
          placeholder={settings?.symbols?.present || "prisoten"}
          defaultValue={settings?.symbols?.present}
          id="present_symbol_input"
        />

        <TextInput
          label="Opravičen simbol"
          placeholder={settings?.symbols?.excused || "opravičen"}
          defaultValue={settings?.symbols?.excused}
          id="excused_symbol_input"
        />

        <TextInput
          label="Odsoten simbol"
          placeholder={settings?.symbols?.absent || "odsoten"}
          defaultValue={settings?.symbols?.absent}
          id="absent_symbol_input"
        />
      </div>

      <Horizontal />

      <div>
        <Subtitle title="Barve" />

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
      </div>

      <Horizontal />
    </div>
  );
};

export default PrisotnostSettings;

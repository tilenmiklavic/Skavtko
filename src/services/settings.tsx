import SheetInfo from "../classes/SettingsInterface";

export default function createSettingsObject(): SheetInfo {
  // Create an empty SheetDetails object
  const emptySheetDetails = { id: "", link: "" };

  // Return an object matching the SheetInfo interface structure
  return {
    steg: "",
    veja: "",
    racuni: { ...emptySheetDetails },
    potni: { ...emptySheetDetails },
    prisotnost: { ...emptySheetDetails },
  };
}

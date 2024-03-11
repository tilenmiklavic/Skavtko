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

export function getSettings(): SheetInfo {
  // Get the settings from local storage
  const settings = localStorage.getItem("settings");

  // If the settings are not found, create a new settings object
  if (!settings) {
    const newSettings = createSettingsObject();
    localStorage.setItem("settings", JSON.stringify(newSettings));
    return newSettings;
  }

  // Return the settings object
  return JSON.parse(settings);
}

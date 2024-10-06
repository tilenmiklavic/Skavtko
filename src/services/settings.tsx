import UserProfile from "../classes/Profile";
import SettingsInterface, {
  isSettingsInterface,
} from "../classes/SettingsInterface";

export default function createSettingsObject(
  partialSettings?: any
): SettingsInterface {
  return new SettingsInterface(partialSettings);
}

export function getSettings(): SettingsInterface {
  // Get the settings from local storage
  let settings = localStorage.getItem("settings") || "";

  // If the settings are not found, create a new settings object
  if (!settings) {
    const newSettings = createSettingsObject();
    localStorage.setItem("settings", JSON.stringify(newSettings));
    return newSettings;
  }

  // Parse the settings
  settings = JSON.parse(settings);

  // If the settings are not of the correct type, create a new settings object
  if (!isSettingsInterface(settings)) return createSettingsObject(settings);

  return settings;
}

export function saveSettings(settings: SettingsInterface): void {
  // check if the settings obect is of the correct type
  if (!isSettingsInterface(settings)) return;
  localStorage.setItem("settings", JSON.stringify(settings));
}

export function getProfile(): UserProfile {
  let profile = JSON.parse(localStorage.getItem("profile") || "{}");

  return new UserProfile(profile);
}

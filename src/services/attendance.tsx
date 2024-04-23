import SettingsInterface from "../classes/SettingsInterface";

export function symbol2Description(
  symbol: string,
  settings: SettingsInterface
) {
  switch (symbol) {
    case settings.symbols.present:
      return "Present";
    case settings.symbols.absent:
      return "Absent";
    case settings.symbols.excused:
      return "Excused";
    default:
      return "Unknown";
  }
}

export function symbol2color(symbol: string, settings: SettingsInterface) {
  switch (symbol) {
    case settings.symbols.present:
      return settings.colors.present;
    case settings.symbols.absent:
      return settings.colors.absent;
    case settings.symbols.excused:
      return settings.colors.excused;
    default:
      return "#ffffff";
  }
}

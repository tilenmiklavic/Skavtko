import SettingsInterface from "../classes/SettingsInterface";

export function symbol2Description(
  symbol: string,
  settings: SettingsInterface
) {
  switch (symbol) {
    case "x":
      return "Present";
    case "/":
      return "Absent";
    case "o":
      return "Excused";
    default:
      return "Unknown";
  }
}

export function symbol2color(symbol: string, settings: SettingsInterface) {
  switch (symbol) {
    case settings.symbols.present:
      return "green";
    case settings.symbols.absent:
      return "red";
    case settings.symbols.excused:
      return "amber";
    default:
      return "white";
  }
}

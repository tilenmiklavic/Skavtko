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

export function color2Text(color: string) {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 125 ? "#333333" : "#f8f8f8";
}

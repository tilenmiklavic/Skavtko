interface SheetDetails {
  id: string;
  link: string;
}

function isSheetDetails(obj: any): obj is SheetDetails {
  return obj && typeof obj.id === "string" && typeof obj.link === "string";
}

interface Symbols {
  present: string;
  excused: string;
  absent: string;
}

function isSymbols(obj: any): obj is Symbols {
  return (
    obj &&
    typeof obj.present === "string" &&
    typeof obj.excused === "string" &&
    typeof obj.absent === "string"
  );
}

class SettingsInterface {
  steg: string;
  veja: string;
  racuni: SheetDetails;
  potni: SheetDetails;
  prisotnost: SheetDetails;
  napredovanje: SheetDetails;
  group: SheetDetails;
  symbols: Symbols;

  constructor(options?: Partial<SettingsInterface>) {
    this.steg = options?.steg || "";
    this.veja = options?.veja || "";
    this.racuni = options?.racuni || { id: "", link: "" };
    this.potni = options?.potni || { id: "", link: "" };
    this.prisotnost = options?.prisotnost || { id: "", link: "" };
    this.napredovanje = options?.napredovanje || { id: "", link: "" };
    this.group = options?.group || { id: "", link: "" };
    this.symbols = options?.symbols || {
      present: "x",
      excused: "o",
      absent: "/",
    };
  }
}

export function isSettingsInterface(obj: any): obj is SettingsInterface {
  return (
    obj instanceof SettingsInterface &&
    typeof obj.steg === "string" &&
    typeof obj.veja === "string" &&
    isSheetDetails(obj.racuni) &&
    isSheetDetails(obj.potni) &&
    isSheetDetails(obj.prisotnost) &&
    isSheetDetails(obj.napredovanje) &&
    isSheetDetails(obj.group) &&
    isSymbols(obj.symbols)
  );
}

export default SettingsInterface;

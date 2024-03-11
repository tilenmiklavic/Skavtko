interface SheetDetails {
  id: string;
  link: string;
}

interface SettingsInterface {
  steg: string;
  veja: string;
  racuni: SheetDetails;
  potni: SheetDetails;
  prisotnost: SheetDetails;
  napredovanje: SheetDetails;
  group: SheetDetails;
}

export default SettingsInterface;

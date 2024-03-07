interface SheetDetails {
  id: string;
  link: string;
}

interface SheetInfo {
  racuni: SheetDetails;
  potni: SheetDetails;
  prisotnost: SheetDetails;
}

export default SheetInfo;

import { useState } from "react";
import { getSettings } from "../../services/settings";
import UnderConstruction from "../Common/UnderConstruction";
import OnVV from "./onVV";

const OsebnoNaprevanje = () => {
  const [settings] = useState(getSettings());

  if (settings.veja === "vv") {
    return <OnVV />;
  }

  if (settings.veja === "iv") {
    return <UnderConstruction />;
  }

  return (
    <div>
      <UnderConstruction />
    </div>
  );
};

export default OsebnoNaprevanje;

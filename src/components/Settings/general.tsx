import { useEffect, useState } from "react";
import Dropdown from "../Inputs/dropdown";
import Select from "../Inputs/select";
import TextInput from "../Inputs/textInput";
import Subtitle from "../Text/Subtitle";
import { getSettings } from "../../services/settings";

const GeneralSettings = () => {
  const [steg, setSteg] = useState("");
  const [veja, setVeja] = useState("");
  const [settings, setSettings] = useState(getSettings());

  useEffect(() => {
    setSteg(settings.steg);
    setVeja(settings.veja);
  }, [settings]);

  return (
    <div className="flex-1">
      <Subtitle title="General" />

      <TextInput
        label={"Steg"}
        id={"steg_input"}
        placeholder={"Steg"}
        value={steg}
        onChange={(e) => setSteg(e.target.value)}
      />
      <Select
        label={"Izberi vejo"}
        id={"veja_select"}
        placeholder={"Veja"}
        value={veja}
        onChange={(e) => setVeja(e.target.value)}
      />
    </div>
  );
};

export default GeneralSettings;

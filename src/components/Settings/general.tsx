import Dropdown from "../Inputs/dropdown";
import Select from "../Inputs/select";
import TextInput from "../Inputs/textInput";
import Subtitle from "../Text/Subtitle";

const GeneralSettings = () => {
  return (
    <div className="flex-1">
      <Subtitle title="General" />

      <TextInput label={"Steg"} id={"steg_input"} placeholder={"Steg"} />
      <Select label={"Izberi vejo"} id={"veja_select"} placeholder={"Veja"} />
    </div>
  );
};

export default GeneralSettings;

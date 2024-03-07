import Dropdown from "../Inputs/dropdown";
import TextInput from "../Inputs/textInput";
import Subtitle from "../Text/Subtitle";

const GeneralSettings = () => {
  return (
    <div>
      <Subtitle title="General" />

      <Dropdown label={"Veja"} id={"veja_dropdown"} />
    </div>
  );
};

export default GeneralSettings;

import TextInput from "../Inputs/textInput";
import Subtitle from "../Text/Subtitle";

const GeneralSettings = () => {
  return (
    <div>
      <Subtitle title="General" />

      <TextInput label="Ime" placeholder="ime" id="ime" />
      <TextInput label="Priimek" placeholder="priimek" id="priimek" />
    </div>
  );
};

export default GeneralSettings;

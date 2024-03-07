import TextInput from "../Inputs/textInput";
import Subtitle from "../Text/Subtitle";

const RacuniSettings = () => {
  return (
    <div>
      <Subtitle title="Računi" />
      <TextInput
        label="Spreadsheet link"
        placeholder="link"
        id="racuni_input"
      />
    </div>
  );
};

export default RacuniSettings;

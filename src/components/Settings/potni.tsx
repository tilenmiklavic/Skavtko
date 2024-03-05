import TextInput from "../Inputs/textInput";
import Subtitle from "../Text/Subtitle";

const PotniSettings = () => {
  return (
    <div>
      <Subtitle title="Potni stroški" />
      <TextInput label="Spreadsheet link" placeholder="link" id="link" />
    </div>
  );
};

export default PotniSettings;

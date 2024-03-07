import TextInput from "../Inputs/textInput";
import Subtitle from "../Text/Subtitle";

const PrisotnostSettings = () => {
  return (
    <div>
      <Subtitle title="Prisotnost" />
      <TextInput
        label="Spreadsheet link"
        placeholder="link"
        id="prisotnost_input"
      />
    </div>
  );
};

export default PrisotnostSettings;

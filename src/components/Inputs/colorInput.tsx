interface ColorInputProps {
  label: string;
  id: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ColorInput = (props: ColorInputProps) => {
  return (
    <div className="grid justify-items-center">
      <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
        {props.label}
      </label>
      <input
        type="color"
        id={props.id}
        defaultValue={props.defaultValue}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 h-10 w-20 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={props.onChange}
      ></input>
    </div>
  );
};

export default ColorInput;

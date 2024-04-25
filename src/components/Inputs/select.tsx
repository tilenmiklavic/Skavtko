import { Select, Option } from "@material-tailwind/react";

interface SelectProps {
  label: string;
  id: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const VejaSelect = (props: SelectProps) => {
  return (
    <div className="mb-3">
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {props.label}
      </label>
      <select
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option>{props.placeholder}</option>
        <option value="bb">BB</option>
        <option value="vv">VV</option>
        <option value="iv">IV</option>
        <option value="pp">PP</option>
      </select>
    </div>
  );
};

export default VejaSelect;

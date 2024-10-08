import moment from "moment";

interface DateInputProps {
  label: string;
  id: string;
  placeholder: string;
  required?: boolean;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateInput = (props: DateInputProps) => {
  let today = moment().format("YYYY-MM-DD");

  return (
    <div className="mb-3">
      <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
        {props.label}
      </label>
      <input
        type="date"
        id={props.id}
        name={props.id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={props.placeholder}
        required={props.required}
        defaultValue={today}
        onChange={props.onChange}
        disabled={props.disabled}
      ></input>
    </div>
  );
};

export default DateInput;

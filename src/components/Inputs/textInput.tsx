import React from "react";

interface NavItemProps {
  label?: string;
  className?: string;
  id: string;
  placeholder: string;
  required?: boolean;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  clearButton?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = React.forwardRef<HTMLInputElement, NavItemProps>(
  (props, ref) => {
    return (
      <div className={props.className}>
        {props.label && (
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            {props.label}
          </label>
        )}
        <input
          type={props.clearButton ? "search" : "text"}
          id={props.id}
          name={props.id}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={props.placeholder}
          required={props.required}
          defaultValue={props.defaultValue}
          onChange={props.onChange}
          disabled={props.disabled}
          ref={ref} // Attach the forwarded ref here
        ></input>
      </div>
    );
  },
);

export default TextInput;

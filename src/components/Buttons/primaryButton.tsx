import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface NavItemProps {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
  icon?: IconProp;
}

const PrimaryButton = (props: NavItemProps) => {
  let classnameEnabled =
    "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 px-5 py-2.5";
  let classnameDisabled =
    "text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center";

  return (
    <button
      type="button"
      onClick={props.onClick}
      className={props.disabled ? classnameDisabled : classnameEnabled}
    >
      {props.label}
      {props.icon && <FontAwesomeIcon className="ms-3" icon={props.icon} />}
    </button>
  );
};

export default PrimaryButton;

interface NavItemProps {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

const SecondaryButton = (props: NavItemProps) => {
  let classnameEnabled =
    "text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 py-2.5 px-5";
  let classnameDisabled =
    "text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center";

  return (
    <button
      type="button"
      onClick={props.onClick}
      className={props.disabled ? classnameDisabled : classnameEnabled}
    >
      {props.label}
    </button>
  );
};

export default SecondaryButton;

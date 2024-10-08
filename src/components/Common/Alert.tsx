interface AlertProps {
  children: React.ReactNode;
}

const Alert = (props: AlertProps) => {
  return (
    <div
      id="alert-1"
      className="flex items-center p-4 mb-4 text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
      role="alert"
    >
      {props.children}
    </div>
  );
};

export default Alert;

interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Row = (props: RowProps) => {
  return (
    <div
      {...props}
      className={`flex flex-row justify-between items-center ${props.className}`}
    >
      {props.children}
    </div>
  );
};

export default Row;

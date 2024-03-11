interface ContainerProps {
  children: React.ReactNode;
}

const Label = (props: ContainerProps) => {
  return <span className="">{props.children}</span>;
};

export default Label;

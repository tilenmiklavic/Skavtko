interface ContainerProps {
  children: React.ReactNode;
}

const Container = (props: ContainerProps) => {
  return <div className="p-3 flex-1 flex flex-col">{props.children}</div>;
};

export default Container;

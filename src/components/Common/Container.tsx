interface ContainerProps {
  children: React.ReactNode;
}

const Container = (props: ContainerProps) => {
  return <div className="p-3">{props.children}</div>;
};

export default Container;

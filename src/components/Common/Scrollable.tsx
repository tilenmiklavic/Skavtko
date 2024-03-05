interface ScrollableProps {
  children: React.ReactNode;
}

const Scrollable = (props: ScrollableProps) => {
  return <div className="overflow-y-scroll relative">{props.children}</div>;
};

export default Scrollable;

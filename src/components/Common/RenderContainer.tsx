interface RenderContainerProps {
  renderKey: string;
  children: React.ReactNode;
}

const RenderContainer = (props: RenderContainerProps) => {
  return <>{props.children}</>;
};
export default RenderContainer;

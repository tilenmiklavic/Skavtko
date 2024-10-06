interface TitleProps {
  title: string;
}

const Title = (props: TitleProps) => {
  return (
    <h1 className="text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
      {props.title}
    </h1>
  );
};

export default Title;

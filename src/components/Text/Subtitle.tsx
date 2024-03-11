interface SubtitleProps {
  title: string;
}

const Title = (props: SubtitleProps) => {
  return (
    <h2 className="mb-2 text-2xl font-extrabold leading-none tracking-tight text-gray-700 md:text-5xl lg:text-6xl dark:text-white">
      {props.title}
    </h2>
  );
};

export default Title;

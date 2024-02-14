type CardProps = {
  children: React.ReactNode;
};

export default function Card(props: CardProps) {
  return (
    <div className="m-5 p-3 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col">{props.children}</div>
    </div>
  );
}

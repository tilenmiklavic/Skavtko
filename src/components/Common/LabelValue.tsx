interface LabelValueProps {
  label: string;
  value: string;
}

const LabelValue = (props: LabelValueProps) => {
  return (
    <div className="flex gap-1">
      <span className="font-bold">{props.label}: </span>
      <p>{props.value}</p>
    </div>
  );
};

export default LabelValue;

import toast from "react-hot-toast";
import { formatSheet } from "../../services/gsheets";
import { Button, Chip } from "@material-tailwind/react";

interface SheetInfoProps {
  loading: boolean;
  title: string;
  index: number;
  sheet_id: string;
  link: string;
}

const SheetInfo = (props: SheetInfoProps) => {
  const format = async () => {
    toast.promise(
      formatSheet(props.sheet_id, props.index), // The promise you are awaiting
      {
        loading: "Formatting sheet...", // Message shown during loading
        success: "Sheet formatted successfully!", // Message shown on success
        error: "Failed to format sheet.", // Message shown on error
      }
    );
  };

  return (
    <>
      {props.link ? (
        <div className="flex gap-2 items-center">
          {props.loading && <Chip color="amber" value={"Loading..."} />}
          {!props.loading && (
            <div className="flex flex-row w-screen justify-between">
              <div className="flex flex-row items-center">
                <span className="mr-2">Current: </span>
                <Chip color="green" value={props.title} />
              </div>
              <Button size="sm" onClick={format} placeholder={undefined}>
                Format
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Chip color="amber" value={"No spreadsheet"} />
      )}
    </>
  );
};

export default SheetInfo;

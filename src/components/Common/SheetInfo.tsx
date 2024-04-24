import toast from "react-hot-toast";
import { formatSheet } from "../../services/gsheets";
import { Button, Chip } from "@material-tailwind/react";
import ConfirmDialog from "./ConfirmDialog";
import { useState } from "react";

interface SheetInfoProps {
  loading: boolean;
  title: string;
  index: number;
  sheet_id: string;
  link: string;
  format?: boolean;
}

const SheetInfo = (props: SheetInfoProps) => {
  const [openModal, setOpenModal] = useState(false);

  const openDialog = () => {
    setOpenModal(!openModal);
  };

  const format = async () => {
    setOpenModal(!openModal);

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
        <>
          <div className="flex gap-2 items-center">
            {props.loading && <Chip color="amber" value={"Loading..."} />}
            {!props.loading && (
              <div className="flex flex-row w-screen justify-between">
                <div className="flex flex-row items-center">
                  <span className="mr-2">Current: </span>
                  <Chip color="green" value={props.title} />
                </div>
                {props.format && (
                  <Button
                    size="sm"
                    onClick={openDialog}
                    placeholder={undefined}
                  >
                    Format
                  </Button>
                )}
              </div>
            )}
          </div>
          <ConfirmDialog
            open={openModal}
            handleOpen={() => {
              setOpenModal(!openModal);
            }}
            handleConfirm={format}
          />
        </>
      ) : (
        <Chip color="amber" value={"No spreadsheet"} />
      )}
    </>
  );
};

export default SheetInfo;

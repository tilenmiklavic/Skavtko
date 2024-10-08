import toast from "react-hot-toast";
import { formatSheet } from "../../services/gsheets";
import { Button, Chip } from "@material-tailwind/react";
import ConfirmDialog from "./ConfirmDialog";
import { useState } from "react";
import Alert from "./Alert";

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
      },
    );
  };

  return (
    <Alert>
      {props.link ? (
        <>
          <div className="flex gap-2 items-center w-full">
            {props.loading && <Chip color="amber" value={"Loading..."} />}
            {!props.loading && (
              <div className="flex flex-row w-full justify-between">
                <div className="flex flex-row items-center">
                  <span className="mr-2">Current: </span>
                  <Chip color="green" value={props?.title} />
                </div>
                <div className="flex">
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
              </div>
            )}
          </div>
          <ConfirmDialog
            open={openModal}
            title="Pozor"
            content="Ta akcija je nepovratna. Ali ste prepričani, da želite nadaljevati?"
            handleOpen={() => {
              setOpenModal(!openModal);
            }}
            handleConfirm={format}
          />
        </>
      ) : (
        <div className="flex flex-row items-center">
          <span className="mr-2">Current: </span>
          <Chip color="amber" value={"No spreadsheet"} />
        </div>
      )}
    </Alert>
  );
};

export default SheetInfo;

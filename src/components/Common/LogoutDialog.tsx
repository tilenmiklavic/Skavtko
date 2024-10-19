import { faX, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";

interface DialogProps {
  open: boolean;
  title: string;
  content?: string;
  children?: React.ReactNode;
  handleConfirm: () => void;
  handleOpen: () => void;
}

const LogoutDialog = (props: DialogProps) => {
  return (
    <Dialog
      open={props.open}
      handler={props.handleOpen}
      placeholder={undefined}
    >
      <DialogHeader placeholder={undefined} className="flex justify-between">
        {props.title}
        <FontAwesomeIcon
          className="icon mr-2"
          size="sm"
          icon={faXmark}
          onClick={props.handleOpen}
        />
      </DialogHeader>
      <DialogBody placeholder={undefined}>
        <Typography placeholder={undefined} className="mb-2">
          Verzija: 0.1.2
        </Typography>
        Se želiš odjaviti?
      </DialogBody>
      {props.children}
      <DialogFooter placeholder={undefined}>
        <Button
          variant="filled"
          color="green"
          onClick={props.handleConfirm}
          placeholder={undefined}
        >
          <span>Odjava</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default LogoutDialog;

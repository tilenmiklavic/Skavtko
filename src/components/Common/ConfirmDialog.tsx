import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";

interface DialogProps {
  open: boolean;
  title: string;
  content: string;
  children?: React.ReactNode;
  handleConfirm: () => void;
  handleOpen: () => void;
}

const ConfirmDialog = (props: DialogProps) => {
  return (
    <Dialog
      open={props.open}
      handler={props.handleOpen}
      placeholder={undefined}
    >
      <DialogHeader placeholder={undefined}>{props.title}</DialogHeader>
      <DialogBody placeholder={undefined}>{props.content}</DialogBody>
      {props.children}
      <DialogFooter placeholder={undefined}>
        <Button
          variant="text"
          color="red"
          onClick={props.handleOpen}
          className="mr-1"
          placeholder={undefined}
        >
          <span>Nazaj</span>
        </Button>
        <Button
          variant="gradient"
          color="green"
          onClick={props.handleConfirm}
          placeholder={undefined}
        >
          <span>Potrdi</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ConfirmDialog;

import { faX, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    IconButton
} from "@material-tailwind/react";

interface DialogProps {
    open: boolean;
    title: string;
    content?: string;
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
            <DialogHeader
                placeholder={undefined}
                className="flex justify-between"
            >
                {props.title}
                <FontAwesomeIcon
                    className="icon mr-2"
                    size="sm"
                    icon={faXmark}
                    onClick={props.handleOpen}
                />
            </DialogHeader>
            {props.content && (
                <DialogBody placeholder={undefined}>{props.content}</DialogBody>
            )}
            {props.children}
            <DialogFooter placeholder={undefined}>
                <Button
                    variant="filled"
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

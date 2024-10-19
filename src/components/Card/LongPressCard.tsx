import { Button, Card } from "@material-tailwind/react";
import { variant } from "@material-tailwind/react/types/components/card";
import ConfirmDialog from "../Common/ConfirmDialog";
import { useRef, useState } from "react";
import TextInput from "../Inputs/textInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useLongPress } from "../../services/longpress";

type LongPressCardProps = {
  placeholder: undefined;
  key: any;
  data: any;
  className: string;
  style: React.CSSProperties;
  variant?: variant;
  children: React.ReactNode;
  onSave: (origin_name: string, name: string, vod: string) => void;
  onRemove: (name: string) => void;
};

export default function LongPressCard(props: LongPressCardProps) {
  const [openModal, setOpenModal] = useState(false);
  const [editedUserName, setEditedUserName] = useState("");
  const [editedUserVod, setEditedUserVod] = useState("");

  const attrs = useLongPress(
    () => {
      setEditedUserName(props.data.ime);
      setEditedUserVod(props.data.vod);
      setOpenModal(!openModal);
    },
    { threshold: 500, allowScroll: false, scrollThreshold: 20 },
  );

  return (
    <>
      <Card
        placeholder={undefined}
        key={props.key}
        className={props.className}
        style={props.style}
        variant={props.variant}
        {...attrs}
      >
        {props.children}
      </Card>
      <ConfirmDialog
        open={openModal}
        title="Urejanje uporabnika"
        handleOpen={() => {
          setOpenModal(!openModal);
        }}
        handleConfirm={() => {
          setOpenModal(!openModal);
          props.onSave(props.data.ime, editedUserName, editedUserVod);
        }}
      >
        <div className="p-3">
          <TextInput
            label={""}
            id={"edited_user_name"}
            placeholder={"ime"}
            className="mb-3"
            defaultValue={editedUserName}
            onChange={(e) => setEditedUserName(e.target.value)}
          />
          <TextInput
            label={""}
            id={"edited_user_vod"}
            placeholder={"vod"}
            className="mb-3"
            defaultValue={editedUserVod}
            onChange={(e) => setEditedUserVod(e.target.value)}
          />
          <Button
            color="red"
            size="md"
            fullWidth={true}
            placeholder={undefined}
            onClick={() => {
              setOpenModal(!openModal);
              props.onRemove(props.data.ime);
            }}
          >
            <FontAwesomeIcon icon={faTrash} className="mr-1" />
            Izbriši
          </Button>
        </div>
      </ConfirmDialog>
    </>
  );
}

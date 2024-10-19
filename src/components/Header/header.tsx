"use client";

import Title from "../Text/Title";
import { useState } from "react";
import { getProfile } from "../../services/settings";
import { Avatar, Button, IconButton } from "@material-tailwind/react";
import LogoutDialog from "../Common/LogoutDialog";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";

interface NavItemProps {
  title: string;
  settings?: boolean;
  help?: boolean;
}

const Header = (props: NavItemProps) => {
  const [profile] = useState(getProfile());
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const openLogoutDialog = () => {
    setOpenModal(!openModal);
  };

  const logout = () => {
    openLogoutDialog();
    window.localStorage.clear();
    navigate("/login");
  };

  const navigateToHelp = () => {
    navigate("/help");
  };

  const navigateToSettings = () => {
    navigate("/settings");
  };

  return (
    <div className="flex items-center justify-between ms-3 my-3">
      <Title title={props.title} />

      {props.settings && (
        <div className="flex flex-row justify-between gap-4">
          <IconButton
            placeholder={undefined}
            variant="outlined"
            size="md"
            onClick={() => navigateToHelp()}
          >
            <FontAwesomeIcon className="icon" size="lg" icon={faInfo} />
          </IconButton>
          <Avatar
            src={profile.picture}
            size="sm"
            alt="avatar"
            placeholder={undefined}
            onClick={openLogoutDialog}
          />
        </div>
      )}

      {props.help && (
        <Button
          placeholder={undefined}
          variant="outlined"
          size="sm"
          onClick={() => navigateToSettings()}
        >
          Nazaj
        </Button>
      )}

      <LogoutDialog
        open={openModal}
        title={""}
        handleConfirm={() => {
          logout();
        }}
        handleOpen={() => {
          setOpenModal(!openModal);
        }}
      />
    </div>
  );
};

export default Header;

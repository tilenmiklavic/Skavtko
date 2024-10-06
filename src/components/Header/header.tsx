"use client";

import Title from "../Text/Title";
import { useState } from "react";
import { getProfile } from "../../services/settings";
import { Avatar } from "@material-tailwind/react";
import LogoutDialog from "../Common/LogoutDialog";
import { useNavigate } from "react-router-dom";

interface NavItemProps {
  title: string;
  settings?: boolean;
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
  }

  return (
    <div className="flex items-center justify-between ms-3 my-3">
      <Title title={props.title} />

      {props.settings && (
        <Avatar
          src={profile.picture}
          size="sm"
          alt="avatar"
          placeholder={undefined}
          onClick={openLogoutDialog}
        />
      )}

      <LogoutDialog open={openModal} title={""} 
        handleConfirm={() => {
          logout();
        }} handleOpen={() => {
            setOpenModal(!openModal);
        }} 
      />
    </div>
  );
};

export default Header;

"use client";

import Title from "../Text/Title";
import { useState } from "react";
import { getProfile } from "../../services/settings";
import { Avatar } from "@material-tailwind/react";

interface NavItemProps {
  title: string;
  settings?: boolean;
}

const Header = (props: NavItemProps) => {
  const [profile] = useState(getProfile());

  return (
    <div className="flex items-center justify-between ms-3 my-3">
      <Title title={props.title} />

      {props.settings && (
        <Avatar
          src={profile.picture}
          size="sm"
          alt="avatar"
          placeholder={undefined}
        />
      )}
    </div>
  );
};

export default Header;

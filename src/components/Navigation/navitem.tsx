"use client";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./navigation.css";

interface NavItemProps {
  title?: string;
  path: string;
  icon: IconProp;
  enabled?: boolean;
  onClick?: () => void;
}

const NavItem = (props: NavItemProps) => {
  return (
    <div>
      <Link
        to={props.path}
        onClick={props.onClick}
        className={`flex flex-col items-center p-6 ${
          props.enabled ? "bg-gray-300" : ""
        } rounded-t-lg

`}
      >
        <FontAwesomeIcon className="icon" icon={props.icon} />
        <span className="iconLabel text-xs font-bold">{props.title}</span>
      </Link>
    </div>
  );
};

export default NavItem;

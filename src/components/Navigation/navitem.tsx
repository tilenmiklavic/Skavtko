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
}

const NavItem = (props: NavItemProps) => {
  return (
    <div>
      <Link to={props.path} className="flex flex-col items-center space-y-2">
        <FontAwesomeIcon className="icon" icon={props.icon} />
        <span className="iconLabel text-xs font-bold">{props.title}</span>
      </Link>
    </div>
  );
};

export default NavItem;

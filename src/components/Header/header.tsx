"use client";

import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Title from "../Text/Title";

interface NavItemProps {
  title: string;
  settings?: string;
}

const Header = (props: NavItemProps) => {
  return (
    <div className="flex items-center justify-between ms-3 mt-3">
      <Title title={props.title} />

      {props.settings ? (
        <button
          type="button"
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          <Link to={props.settings}>
            <FontAwesomeIcon className="mr-2" size="1x" icon={faGear} />
            Nastavitve
          </Link>
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Header;

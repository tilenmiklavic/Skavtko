import { useState } from "react";
import NavItem from "./navitem";
import { faUser, faHome, faReceipt } from "@fortawesome/free-solid-svg-icons";

import "./navigation.css";

const Navigation = () => {
  const [tab] = useState(0);

  return (
    <nav className="fixed bottom-0 w-full border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-around mx-auto p-4">
        <NavItem title={"Home"} path={"/"} icon={faHome} enabled={tab === 0} />
        <NavItem
          title={"Finance"}
          path={"/finance"}
          icon={faReceipt}
          enabled={tab === 1}
        />
        <NavItem
          title={"Profile"}
          path={"/profile"}
          icon={faUser}
          enabled={tab === 2}
        />
      </div>
    </nav>
  );
};

export default Navigation;

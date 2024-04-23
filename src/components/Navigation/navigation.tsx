import { useState } from "react";
import NavItem from "./navitem";
import {
  faGear,
  faCheckCircle,
  faDumbbell,
  faChartPie,
} from "@fortawesome/free-solid-svg-icons";

import "./navigation.css";
import { faBitcoin } from "@fortawesome/free-brands-svg-icons";

const Navigation = () => {
  const [tab, setTab] = useState(0);

  return (
    <nav className="w-full h-20 flex border-b border-t border-gray-200 dark:border-gray-600">
      <div className="w-screen flex justify-around items-center p-4">
        <NavItem
          path={"/"}
          icon={faCheckCircle}
          enabled={tab === 0}
          onClick={() => setTab(0)}
        />
        <NavItem
          path={"/finance"}
          icon={faBitcoin}
          enabled={tab === 1}
          onClick={() => setTab(1)}
        />
        <NavItem
          path={"/on"}
          icon={faDumbbell}
          enabled={tab === 2}
          onClick={() => setTab(2)}
        />
        <NavItem
          path={"/statistics"}
          icon={faChartPie}
          enabled={tab === 3}
          onClick={() => setTab(3)}
        />
        <NavItem
          path={"/settings"}
          icon={faGear}
          enabled={tab === 4}
          onClick={() => setTab(4)}
        />
      </div>
    </nav>
  );
};

export default Navigation;

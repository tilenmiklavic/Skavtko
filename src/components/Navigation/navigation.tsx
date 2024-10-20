import { useEffect, useState } from "react";
import NavItem from "./navitem";
import {
  faGear,
  faCheckCircle,
  faDumbbell,
  faChartPie,
} from "@fortawesome/free-solid-svg-icons";

import "./navigation.css";
import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import { route2Index, routes } from "../../services/navigation";
import { useLocation } from "react-router-dom";

const Navigation = () => {
  const navigation = useLocation().pathname;
  const PATHS = routes();
  const [tab, setTab] = useState(route2Index(navigation));
  
  useEffect(() => {
    setTab(route2Index(navigation));
  }, [navigation])

  return (
    <nav className="w-full h-20 flex border-b border-t border-gray-200 dark:border-gray-600">
      <div className="w-screen flex justify-around items-center p-4">
        <NavItem
          path={PATHS[0]}
          icon={faCheckCircle}
          enabled={tab === 0}
          onClick={() => setTab(0)}
        />
        <NavItem
          path={PATHS[1]}
          icon={faBitcoin}
          enabled={tab === 1}
          onClick={() => setTab(1)}
        />
        <NavItem
          path={PATHS[2]}
          icon={faDumbbell}
          enabled={tab === 2}
          onClick={() => setTab(2)}
        />
        <NavItem
          path={PATHS[3]}
          icon={faChartPie}
          enabled={tab === 3}
          onClick={() => setTab(3)}
        />
        <NavItem
          path={PATHS[4]}
          icon={faGear}
          enabled={tab === 4}
          onClick={() => setTab(4)}
        />
      </div>
    </nav>
  );
};

export default Navigation;

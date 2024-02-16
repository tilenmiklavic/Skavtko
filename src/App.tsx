import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Finance from "./pages/Finance/Finance";
import Navigation from "./components/Navigation/navigation";
import Profile from "./pages/Profile/Profile";
import { Toaster } from "react-hot-toast";
import FinanceSettings from "./pages/Settings/Settings";

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>

    <Router>
      <div>
        <Toaster />
      </div>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/finance" Component={Finance} />
        <Route path="/settings" Component={FinanceSettings} />
        <Route path="/profile" Component={Profile} />
      </Routes>
      <Navigation />
    </Router>
  );
}

export default App;

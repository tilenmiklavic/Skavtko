import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Finance from "./pages/Finance/Finance";
import Navigation from "./components/Navigation/navigation";
import Profile from "./pages/Profile/Profile";
import { Toaster } from "react-hot-toast";
import FinanceSettings from "./pages/Settings/Settings";
import Login from "./pages/Login/Login";
import { ProtectedRoute } from "./components/Routes/ProtectedRoute";

function App() {
  return (
    <Router>
      <div>
        <Toaster />
      </div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/finance"
          element={
            <ProtectedRoute>
              <Finance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <FinanceSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Navigation />
    </Router>
  );
}

export default App;

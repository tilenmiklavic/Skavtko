import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Finance from "./pages/Finance/Finance";
import Navigation from "./components/Navigation/navigation";
import Profile from "./pages/Profile/Profile";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login/Login";
import { ProtectedRoute } from "./components/Routes/ProtectedRoute";
import Prisotnost from "./pages/Prisotnost/Prisotnost";
import Container from "./components/Common/Container";
import Settings from "./pages/Settings/Settings";
import Statistics from "./pages/Statistics/Statistics";
import FinanceManual from "./pages/Finance/FinanceManual";
import Napredovanje from "./pages/Napredovanje/Napredovanje";

function App() {
  return (
    <Router>
      <div>
        <Toaster />
      </div>
      <div className="flex flex-col h-screen">
        <div className="flex-1 flex flex-col overflow-auto">
          <Container>
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
                path="/finance/manual"
                element={
                  <ProtectedRoute>
                    <FinanceManual />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/prisotnost"
                element={
                  <ProtectedRoute>
                    <Prisotnost />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
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
              <Route
                path="/statistics"
                element={
                  <ProtectedRoute>
                    <Statistics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/on"
                element={
                  <ProtectedRoute>
                    <Napredovanje />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Container>
        </div>
        <div className="flex">
          <Navigation />
        </div>
      </div>
    </Router>
  );
}

export default App;

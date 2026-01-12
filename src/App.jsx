import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import localforage from "localforage";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const ForgotPassword = () => <h1 className="text-3xl">Forgot Password</h1>;
const LinkingAccount = () => <h1 className="text-3xl">Linking Account</h1>;
const Home = () => <h1 className="text-3xl">Home (Protected)</h1>;
const Trade = () => <h1 className="text-3xl">Trade</h1>;
const Bot = () => <h1 className="text-3xl">Bot</h1>;
const History = () => <h1 className="text-3xl">History</h1>;
const Settings = () => <h1 className="text-3xl">Settings</h1>;

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await localforage.getItem("token");
      setIsAuthenticated(!!token);
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>; // Prevents flicker
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/linking-account" element={<LinkingAccount />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trade"
          element={
            <ProtectedRoute>
              <Trade />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bot"
          element={
            <ProtectedRoute>
              <Bot />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
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

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

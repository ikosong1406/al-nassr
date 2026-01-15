// src/App.jsx
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
import ForgotPassword from "./pages/Forgot";
import LinkingAccount from "./pages/Linking";
import TabNavigator from "./pages/Tab";
import Home from "./pages/Home";
import Bot from "./pages/Bot";
import History from "./pages/History";

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

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

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
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/linking" element={<LinkingAccount />} />

        {/* Protected Routes wrapped with TabNavigator */}
        <Route
          path="/app"
          element={
            // <ProtectedRoute>
            <TabNavigator />
            // </ProtectedRoute>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="bot" element={<Bot />} />
          <Route path="history" element={<History />} />
          <Route index element={<Navigate to="/app/home" replace />} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

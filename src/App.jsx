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
import Bot from "./pages/Bot";

// Updated Screen Components with better UI
const Home = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <div className="bg-gradient-to-r from-gray-900 to-black rounded-xl p-6 border border-gray-800">
          <h2 className="text-2xl font-bold mb-4">Trading Dashboard</h2>
          <div className="h-64 bg-black/50 rounded-lg border border-gray-800 flex items-center justify-center">
            <span className="text-gray-400">Live Trading Chart</span>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div className="bg-gray-900 rounded-xl p-6">
          <h3 className="font-bold mb-4">Account Summary</h3>
          <div className="space-y-4">
            <div>
              <p className="text-gray-400 text-sm">Balance</p>
              <p className="text-2xl font-bold">$12,456.78</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Today's P/L</p>
              <p className="text-green-400 text-xl font-bold">+$245.67</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Trade = () => (
  <div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-6"
  >
    <div className="bg-gradient-to-r from-gray-900 to-black rounded-xl p-6 border border-gray-800">
      <h2 className="text-2xl font-bold mb-6">Trade Markets</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {["BTC/USD", "ETH/USD", "SOL/USD", "XRP/USD"].map((pair) => (
          <div
            key={pair}
            className="bg-black/50 rounded-lg p-4 border border-gray-800"
          >
            <h3 className="font-bold">{pair}</h3>
            <p className="text-green-400">+2.4%</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const History = () => (
  <div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-6"
  >
    <div className="bg-gradient-to-r from-gray-900 to-black rounded-xl p-6 border border-gray-800">
      <h2 className="text-2xl font-bold mb-6">Trade History</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-gray-400 text-left border-b border-gray-800">
              <th className="pb-3">Pair</th>
              <th className="pb-3">Type</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3">Profit/Loss</th>
              <th className="pb-3">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {[
              {
                pair: "BTC/USD",
                type: "Buy",
                amount: "+0.5 BTC",
                pnl: "+$245",
                time: "10:30 AM",
              },
              {
                pair: "ETH/USD",
                type: "Sell",
                amount: "-2.1 ETH",
                pnl: "+$125",
                time: "09:15 AM",
              },
              {
                pair: "SOL/USD",
                type: "Buy",
                amount: "+15 SOL",
                pnl: "-$45",
                time: "Yesterday",
              },
              {
                pair: "BTC/USD",
                type: "Sell",
                amount: "-0.2 BTC",
                pnl: "+$89",
                time: "2 days ago",
              },
            ].map((trade, i) => (
              <tr key={i} className="hover:bg-gray-900/50">
                <td className="py-3 font-medium">{trade.pair}</td>
                <td
                  className={`py-3 ${
                    trade.type === "Buy" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {trade.type}
                </td>
                <td className="py-3">{trade.amount}</td>
                <td
                  className={`py-3 ${
                    trade.pnl.startsWith("+")
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {trade.pnl}
                </td>
                <td className="py-3 text-gray-400">{trade.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const Settings = () => (
  <div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-6"
  >
    <div className="bg-gradient-to-r from-gray-900 to-black rounded-xl p-6 border border-gray-800">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      <div className="space-y-4">
        {[
          { title: "Account Settings", desc: "Update profile and security" },
          { title: "API Keys", desc: "Manage trading API connections" },
          {
            title: "Notifications",
            desc: "Configure alerts and notifications",
          },
          { title: "Appearance", desc: "Customize theme and display" },
          {
            title: "Risk Management",
            desc: "Set trading limits and stop-loss",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 bg-black/50 rounded-lg hover:bg-gray-900/50"
          >
            <div>
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
            <button className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700">
              Configure
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

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
          <Route path="trade" element={<Trade />} />
          <Route path="history" element={<History />} />
          <Route path="settings" element={<Settings />} />
          <Route index element={<Navigate to="/app/home" replace />} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

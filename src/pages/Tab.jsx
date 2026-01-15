// src/components/TabNavigator.jsx
import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHome,
  FaChartLine,
  FaRobot,
  FaHistory,
  FaCog,
  FaBars,
  FaTimes,
  FaUser,
  FaWallet,
} from "react-icons/fa";

const TabNavigator = () => {
  const [activeTab, setActiveTab] = useState("/home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { id: "/app/home", label: "Trade", icon: FaChartLine },
    { id: "/app/bot", label: "AI Bot", icon: FaRobot },
    { id: "/app/history", label: "History", icon: FaHistory },
  ];

  // Update active tab when route changes
  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  const handleTabClick = (path) => {
    navigate(path);
    setActiveTab(path);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="hidden md:flex md:w-64 lg:w-72 bg-gradient-to-b from-gray-900 to-black border-r border-gray-800 flex-col"
      >
        {/* Logo/Brand */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-bold">Stratix</h1>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
              <FaUser className="text-gray-400" />
            </div>
            <div>
              <h3 className="font-semibold">MetaTrader 5</h3>
              <p className="text-gray-400 text-sm">Connected</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <li key={tab.id}>
                  <button
                    onClick={() => handleTabClick(tab.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-teal-900/50 to-teal-800/30 text-teal-400 border-l-4 border-teal-500"
                        : "hover:bg-gray-800/50 text-gray-300"
                    }`}
                  >
                    <Icon
                      className={`text-lg ${
                        isActive ? "text-teal-400" : "text-gray-400"
                      }`}
                    />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </motion.div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-black border-t border-gray-800 z-50">
        <div className="flex justify-around items-center h-16 px-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className="flex flex-col items-center justify-center flex-1 h-full"
              >
                <div
                  className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white -translate-y-2"
                      : "text-gray-400"
                  }`}
                >
                  <Icon className="text-xl" />
                  {isActive && (
                    <motion.div
                      layoutId="mobile-tab-indicator"
                      className="absolute -bottom-1 w-1 h-1 bg-teal-400 rounded-full"
                    />
                  )}
                </div>
                <span
                  className={`text-xs mt-1 ${
                    isActive ? "text-teal-400 font-medium" : "text-gray-400"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gradient-to-r from-gray-900 to-black border-b border-gray-800 z-40 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div>
              <h1 className="font-bold">Stratix</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col pt-16 md:pt-0 pb-16 md:pb-0">
        {/* Content Header */}
        <div className="hidden md:block border-b border-gray-800 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">
                {tabs.find((tab) => tab.id === activeTab)?.label || "Dashboard"}
              </h1>
              <p className="text-gray-400">
                Welcome back to your AI trading dashboard
              </p>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabNavigator;

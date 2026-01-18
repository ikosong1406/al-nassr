// src/components/TabNavigator.jsx
import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFire, FaGifts, FaUser, FaTrophy } from "react-icons/fa";
import logo from "../assets/logo.png";

const TabNavigator = () => {
  const [activeTab, setActiveTab] = useState("/home");
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { id: "/app/home", label: "Fireside", icon: FaFire },
    { id: "/app/gifts", label: "Gifts", icon: FaGifts },
    { id: "/app/profile", label: "Profile", icon: FaUser },
  ];

  // Update active tab when route changes
  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  const handleTabClick = (path) => {
    navigate(path);
    setActiveTab(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 text-white flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="hidden md:flex md:w-64 lg:w-72 bg-gradient-to-b from-blue-900/90 to-blue-950/90 backdrop-blur-sm border-r border-yellow-500/20 flex-col shadow-2xl shadow-black/30"
      >
        {/* Logo/Brand with Yellow Accent */}
        <div className="p-6 border-b border-yellow-500/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center">
              <img src={logo} alt="Al-Nassr Logo" />
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                Al-Nassr
              </h1>
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
                <motion.li key={tab.id} whileHover={{ scale: 1.02 }}>
                  <button
                    onClick={() => handleTabClick(tab.id)}
                    className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-yellow-500/20 to-yellow-600/10 border-l-4 border-yellow-400 shadow-lg shadow-yellow-500/20"
                        : "hover:bg-blue-800/50 hover:border-l-4 hover:border-yellow-500/30"
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                        isActive
                          ? "bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg shadow-yellow-500/30"
                          : "bg-blue-800/50"
                      }`}
                    >
                      <Icon
                        className={`text-lg ${
                          isActive ? "text-white" : "text-yellow-300"
                        }`}
                      />
                    </div>
                    <div className="text-left">
                      <span
                        className={`font-bold text-lg ${
                          isActive
                            ? "text-yellow-300"
                            : "text-blue-200 hover:text-yellow-300"
                        }`}
                      >
                        {tab.label}
                      </span>
                    </div>
                    {isActive && (
                      <motion.div
                        layoutId="desktop-tab-indicator"
                        className="ml-auto w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
                      />
                    )}
                  </button>
                </motion.li>
              );
            })}
          </ul>
        </nav>
      </motion.div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900 to-blue-950 backdrop-blur-lg border-t border-yellow-500/30 z-50 shadow-2xl shadow-black/50">
        <div className="flex justify-around items-center h-20 px-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center justify-center flex-1 h-full"
              >
                <motion.div
                  animate={{
                    y: isActive ? -10 : 0,
                  }}
                  className={`relative flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-br from-yellow-300 to-yellow-400 shadow-xl shadow-yellow-500/40"
                      : "bg-blue-800/50"
                  }`}
                >
                  <Icon
                    className={`text-xl ${
                      isActive ? "text-white" : "text-yellow-300"
                    }`}
                  />
                  {isActive && (
                    <motion.div
                      layoutId="mobile-tab-indicator"
                      className="absolute -bottom-2 w-6 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"
                    />
                  )}
                </motion.div>
                <span
                  className={`text-xs font-semibold mt-2 ${
                    isActive ? "text-yellow-300" : "text-blue-200"
                  }`}
                >
                  {tab.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-900 to-blue-950 backdrop-blur-lg border-b border-yellow-500/20 z-40 p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center">
              <img src={logo} alt="Al-Nassr Logo" />
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                Al-Nassr
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col pt-20 md:pt-0 pb-20 md:pb-0 bg-gradient-to-br from-blue-900/20 via-blue-800/20 to-blue-950/20">
        {/* Content Header */}
        <div className="hidden md:block border-b border-yellow-500/20 p-6 bg-gradient-to-r from-blue-900/50 to-blue-800/30 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-white">
                {tabs.find((tab) => tab.id === activeTab)?.label || "Dashboard"}
              </h1>
            </div>
          </div>
        </div>

        {/* Page Content with Glass Effect */}
        <div className="flex-1 overflow-y-auto p-2 md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default TabNavigator;

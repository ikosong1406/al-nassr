// src/components/AccountLink.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaLink,
  FaCheckCircle,
  FaChartLine,
} from "react-icons/fa";
import meta from "../assets/meta.jpg";
import { useNavigate } from "react-router-dom";

const AccountLink = () => {
  const [isConnecting, setIsConnecting] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showProceed, setShowProceed] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/home");
  };
  // Simulate connection progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsConnecting(false);
            setShowProceed(true);
          }, 500);
          return 100;
        }
        return prev + 20;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Floating bubbles component
  const FloatingBubbles = () => {
    const bubbles = [
      { size: 40, left: "10%", delay: 0, duration: 4 },
      { size: 25, left: "20%", delay: 0.5, duration: 3.5 },
      { size: 60, left: "85%", delay: 1, duration: 5 },
      { size: 30, left: "75%", delay: 0.3, duration: 4.5 },
      { size: 45, left: "40%", delay: 0.8, duration: 4 },
      { size: 35, left: "60%", delay: 0.2, duration: 3.8 },
    ];

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {bubbles.map((bubble, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-gradient-to-br from-teal-500/10 to-teal-700/5 border border-teal-500/20"
            style={{
              width: bubble.size,
              height: bubble.size,
              left: bubble.left,
              bottom: -bubble.size,
            }}
            initial={{ y: 0 }}
            animate={{
              y: `-${window.innerHeight + bubble.size}px`,
              x: [0, Math.random() * 50 - 25, 0],
            }}
            transition={{
              y: {
                duration: bubble.duration,
                repeat: Infinity,
                delay: bubble.delay,
                ease: "linear",
              },
              x: {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                delay: bubble.delay,
              },
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Split Layout Container */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Section - Brand & Value Proposition */}
        <div className="lg:w-1/2 bg-gradient-to-br from-gray-900 via-black to-teal-900/20 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative">
          <FloatingBubbles />
          <div className="max-w-lg mx-auto lg:mx-0 relative z-10">
            {/* Logo */}
            <div className="flex items-center space-x-3 mb-4 lg:mb-12">
              <h1 className="text-2xl font-bold text-white">Stratix</h1>
            </div>

            {/* Main Value Proposition */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-base text-gray-300 italic mb-6">
                Linking to MetaTrader to unlock AI-powered trading insights and
                automated strategies.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right Section - Connection Interface */}
        <div className="lg:w-1/2 bg-black p-8 md:p-12 lg:p-16 flex items-center justify-center">
          <div className="w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              {/* Connection Status */}
              <div className="mb-8">
                <h3 className="text-3xl font-bold mb-2">
                  {isConnecting ? "Connecting..." : "Connection Established"}
                </h3>
                <p className="text-gray-400">
                  {isConnecting
                    ? "Linking to MetaTrader 5"
                    : "Successfully connected to MetaTrader 5"}
                </p>
              </div>

              {/* MetaTrader Logo Container */}
              <div className="relative mb-8">
                {/* Outer Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-teal-600/10 blur-2xl rounded-full" />

                {/* Logo with Animation */}
                <div className="relative z-10">
                  <motion.div
                    className="mx-auto w-48 h-48 bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 flex items-center justify-center shadow-2xl"
                    animate={
                      isConnecting
                        ? {
                            scale: [1, 1.05, 1],
                            boxShadow: [
                              "0 0 20px rgba(20, 184, 166, 0.3)",
                              "0 0 40px rgba(20, 184, 166, 0.5)",
                              "0 0 20px rgba(20, 184, 166, 0.3)",
                            ],
                          }
                        : {
                            scale: 1,
                            boxShadow: "0 0 40px rgba(20, 184, 166, 0.7)",
                          }
                    }
                    transition={
                      isConnecting
                        ? {
                            scale: {
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            },
                            boxShadow: {
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            },
                          }
                        : { duration: 0.5 }
                    }
                  >
                    {/* MT5 Logo */}
                    <div className="text-center">
                      <div className="items-center justify-center space-x-2 mb-4">
                        <img src={meta} alt="" className="rounded-4xl w-40" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Connection Icon */}
                  <motion.div
                    className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center border-4 border-black"
                    animate={
                      isConnecting
                        ? {
                            rotate: 360,
                            scale: [1, 1.2, 1],
                          }
                        : { rotate: 0, scale: 1 }
                    }
                    transition={
                      isConnecting
                        ? {
                            rotate: {
                              duration: 3,
                              repeat: Infinity,
                              ease: "linear",
                            },
                            scale: {
                              duration: 1,
                              repeat: Infinity,
                              ease: "easeInOut",
                            },
                          }
                        : { duration: 0.5 }
                    }
                  >
                    {isConnecting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <FaLink className="text-white text-lg" />
                    )}
                  </motion.div>
                </div>
              </div>

              {/* Progress Bar */}
              {isConnecting && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-8"
                >
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Connecting...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-teal-500 to-teal-600 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Establishing secure connection with MetaTrader servers
                  </p>
                </motion.div>
              )}

              {/* Success Message */}
              {!isConnecting && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <FaCheckCircle className="text-teal-400 text-2xl" />
                    <span className="text-xl font-semibold text-gray-200">
                      Connection Successful!
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Proceed Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: showProceed ? 1 : 0,
                  y: showProceed ? 0 : 20,
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all flex items-center justify-center space-x-2 ${
                  !showProceed && "pointer-events-none"
                }`}
                onClick={handleNavigate}
              >
                <span>Proceed to Dashboard</span>
                <FaArrowRight />
              </motion.button>

              {/* Security Note */}
              <div className="mt-8 pt-6 border-t border-gray-800">
                <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                  <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
                  <span>Secure encrypted connection</span>
                  <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Your trading data is protected with end-to-end encryption
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountLink;

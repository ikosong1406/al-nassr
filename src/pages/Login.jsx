// src/components/Login.jsx - Professional Redesign
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaChartLine,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
} from "react-icons/fa";

const Login = ({ onNavigate }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Split Layout Container */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Section - Brand & Value Proposition */}
        <div className="lg:w-1/2 bg-gradient-to-br from-gray-900 via-black to-teal-900/20 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="max-w-lg mx-auto lg:mx-0">
            {/* Logo */}
            <div className="flex items-center space-x-3 mb-8 lg:mb-12">
              <h1 className="text-2xl font-bold text-white">Stratix</h1>
            </div>

            {/* Main Value Proposition */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                AI-Powered <span className="text-teal-400">Forex Trading</span>{" "}
                Made Effortless
              </h2>

              <p className="text-xl text-gray-300 mb-8">
                Let our AI analyze markets 24/7 and execute profitable trades
                while you focus on what matters.
              </p>

              {/* Feature Highlights */}
              <div className="space-y-4 mt-8">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-gray-300">99.8% AI accuracy rate</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-gray-300">24/7 market monitoring</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-gray-300">Bank-level security</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="lg:w-1/2 bg-black p-8 md:p-12 lg:p-16 flex items-center justify-center">
          <div className="w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Form Header */}
              <div className="mb-8">
                <h3 className="text-3xl font-bold mb-2">Welcome Back</h3>
                <p className="text-gray-400">Let's have you logged in</p>
              </div>

              {/* Login Form */}
              <form className="space-y-6">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-500" />
                    </div>
                    <input
                      type="email"
                      className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Password
                    </label>
                    <button
                      type="button"
                      className="text-sm text-teal-400 hover:text-teal-300 transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-500" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full pl-10 pr-12 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="text-gray-500 hover:text-gray-400" />
                      ) : (
                        <FaEye className="text-gray-500 hover:text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    className="w-4 h-4 text-teal-600 bg-gray-800 border-gray-700 rounded focus:ring-teal-500 focus:ring-2"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="ml-2 text-sm text-gray-300"
                  >
                    Remember me for 30 days
                  </label>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Sign In</span>
                  <FaArrowRight />
                </motion.button>
              </form>

              {/* Sign Up Link */}
              <div className="mt-8 pt-6 border-t border-gray-800 text-center">
                <p className="text-gray-400">
                  Don't have an account?{" "}
                  <button
                    onClick={() => onNavigate("signup")}
                    className="text-teal-400 hover:text-teal-300 font-semibold transition-colors"
                  >
                    Sign up
                  </button>
                </p>
              </div>

              {/* Security Note */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  Your data is secured with 256-bit SSL encryption
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

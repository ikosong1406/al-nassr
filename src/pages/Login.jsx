import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import localforage from "localforage";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaStar,
} from "react-icons/fa";
import Api from "../components/Api";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send login request
      const response = await axios.post(
        `${Api}/login`, // Your backend URL
        {
          email: formData.email.toLowerCase(),
          password: formData.password,
        },
      );

      // If successful
      if (response.data.success && response.data.token) {
        // Store token in localStorage (simplest approach)
        localforage.setItem("authToken", response.data.token);

        // Show success message
        toast.success("Login successful!");

        // Redirect after a short delay
        setTimeout(() => {
          navigate("/app");
        }, 1000);
      }
    } catch (error) {
      // Handle errors
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white overflow-hidden">
      {/* Toast notifications */}
      <Toaster position="top-center" />

      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://i.pinimg.com/1200x/11/e3/7d/11e37dbd7c0c06fe6659f35a3bf9d974.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/30 via-yellow-600/20 to-black/80" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-blue-900/90 to-blue-950/90 border border-yellow-500/30 rounded-3xl p-8 backdrop-blur-sm"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-yellow-500/10 px-3 py-2 rounded-full mb-4">
                <FaStar className="text-yellow-300" />
                <span className="text-yellow-300 font-medium">
                  Official Member Login
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-2">
                Sign In to Your Account
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-yellow-300/70" />
                  </div>
                  <input
                    type="email"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-blue-900/40 border border-yellow-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-semibold text-gray-300">
                    Password
                  </label>
                  <a
                    href="/forgot"
                    className="text-sm text-yellow-300 hover:text-yellow-300"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-yellow-300/70" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full pl-10 pr-12 py-3 bg-blue-900/40 border border-yellow-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    disabled={loading}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-gray-400 hover:text-yellow-300" />
                    ) : (
                      <FaEye className="text-gray-400 hover:text-yellow-300" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-yellow-300 to-yellow-400 text-blue-900 font-bold rounded-xl flex items-center justify-center space-x-3 shadow-lg shadow-yellow-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-3 text-blue-900"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Signing In...
                  </span>
                ) : (
                  <>
                    <span className="text-lg">Sign In</span>
                    <FaArrowRight />
                  </>
                )}
              </motion.button>

              {/* Sign Up Link */}
              <div className="text-center pt-6 border-t border-yellow-500/20">
                <p className="text-gray-300">
                  Don't have an account?{" "}
                  <a
                    href="/signup"
                    className="text-yellow-300 hover:text-yellow-300 font-semibold"
                  >
                    Join Now
                  </a>
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;

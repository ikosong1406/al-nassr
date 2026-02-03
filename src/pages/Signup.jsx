import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  FaChartLine,
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
} from "react-icons/fa";
import Api from "../components/Api";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!agreedToTerms) {
      toast.error("You must agree to the terms and conditions");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      // Send signup request
      const response = await axios.post(`${Api}/signup`, {
        firstname: formData.firstName,
        lastname: formData.lastName,
        email: formData.email.toLowerCase(),
        password: formData.password,
      });

      if (response.data.success) {
        // Show success toast
        toast.success(
          "Account created successfully! Please login with your credentials",
          {
            duration: 3000,
          },
        );

        // Wait a moment then navigate to login
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      // Handle errors
      const errorMessage =
        error.response?.data?.message || "Signup failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/30 via-yellow-400/20 to-black/80" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Signup Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-blue-900/90 to-blue-950/90 border border-yellow-300/30 rounded-3xl p-8 backdrop-blur-sm"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-yellow-500/10 px-4 py-2 rounded-full mb-4">
                <FaChartLine className="text-yellow-300" />
                <span className="text-yellow-300 font-medium">
                  Create Your Account
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-2">
                Join Al-Nassr Giveaways
              </h2>
              <p className="text-gray-300">
                Start winning amazing prizes today
              </p>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-yellow-300/70" />
                    </div>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-blue-900/40 border border-yellow-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-300"
                      placeholder="John"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-yellow-300/70" />
                    </div>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-blue-900/40 border border-yellow-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-300"
                      placeholder="Doe"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-yellow-300/70" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-blue-900/40 border border-yellow-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    placeholder="you@example.com"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-yellow-300/70" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3 bg-blue-900/40 border border-yellow-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    placeholder="••••••••"
                    required
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

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-yellow-300/70" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3 bg-blue-900/40 border border-yellow-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    placeholder="••••••••"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    disabled={loading}
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash className="text-gray-400 hover:text-yellow-300" />
                    ) : (
                      <FaEye className="text-gray-400 hover:text-yellow-300" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="w-4 h-4 text-yellow-300 bg-blue-900/40 border-yellow-500/50 rounded focus:ring-yellow-300 focus:ring-2 mt-1"
                  disabled={loading}
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-300">
                  I agree to the{" "}
                  <button
                    type="button"
                    className="text-yellow-300 hover:text-yellow-300 underline"
                  >
                    Terms and Conditions
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    className="text-yellow-300 hover:text-yellow-300 underline"
                  >
                    Privacy Policy
                  </button>
                </label>
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
                    Creating Account...
                  </span>
                ) : (
                  <>
                    <span className="text-lg">Create Account</span>
                    <FaArrowRight />
                  </>
                )}
              </motion.button>
            </form>

            {/* Login Link */}
            <div className="mt-8 pt-6 border-t border-yellow-500/20 text-center">
              <p className="text-gray-300">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-yellow-300 hover:text-yellow-300 font-semibold"
                >
                  Sign in
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

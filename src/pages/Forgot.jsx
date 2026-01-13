// src/components/ForgotPassword.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaChartLine,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaCheckCircle,
  FaKey,
  FaShieldAlt,
} from "react-icons/fa";

const ForgotPassword = ({ onNavigate }) => {
  // Step states: 1 = Enter email, 2 = Enter code, 3 = Set new password
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    verificationCode: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(2);
    }, 1500);
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(3);
    }, 1500);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setResetSuccess(true);
      // Reset form after success
      setTimeout(() => {
        setFormData({
          email: "",
          verificationCode: "",
          newPassword: "",
          confirmPassword: "",
        });
        setCurrentStep(1);
        setResetSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Split Layout Container */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Section - Brand & Value Proposition */}
        <div className="lg:w-1/2 bg-gradient-to-br from-gray-900 via-black to-teal-900/20 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="max-w-lg mx-auto lg:mx-0">
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
              <p className="text-base text-gray-300 italic">
                Let our AI analyze markets 24/7 and execute profitable trades
                while you focus on what matters.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right Section - Reset Form */}
        <div className="lg:w-1/2 bg-black p-8 md:p-12 lg:p-16 flex items-center justify-center">
          <div className="w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Form Header */}
              <div className="mb-8">
                <h3 className="text-3xl font-bold mb-2">
                  {resetSuccess
                    ? "Password Reset Successful"
                    : currentStep === 1
                    ? "Reset Your Password"
                    : currentStep === 2
                    ? "Verify Your Email"
                    : "Create New Password"}
                </h3>
                <p className="text-gray-400">
                  {resetSuccess
                    ? "Your password has been successfully reset"
                    : currentStep === 1
                    ? "Enter your email to receive a verification code"
                    : currentStep === 2
                    ? "Enter the 6-digit code sent to your email"
                    : "Enter your new password below"}
                </p>
              </div>

              {/* Success Message */}
              {resetSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 bg-teal-900/30 border border-teal-800 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <FaCheckCircle className="text-teal-400 text-xl" />
                    <div>
                      <p className="text-teal-300 font-medium">
                        Password Reset Complete!
                      </p>
                      <p className="text-teal-400/80 text-sm mt-1">
                        You can now log in with your new password.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 1: Enter Email */}
              {currentStep === 1 && !resetSuccess && (
                <form onSubmit={handleSendCode} className="space-y-6">
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
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      We'll send a verification code to this email
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <span>Sending...</span>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      </>
                    ) : (
                      <>
                        <span>Send Verification Code</span>
                        <FaArrowRight />
                      </>
                    )}
                  </motion.button>
                </form>
              )}

              {/* Step 2: Enter Verification Code */}
              {currentStep === 2 && !resetSuccess && (
                <form onSubmit={handleVerifyCode} className="space-y-6">
                  <div className="mb-4 p-4 bg-gray-900/50 rounded-lg border border-gray-800">
                    <div className="flex items-center space-x-3">
                      <FaShieldAlt className="text-teal-400" />
                      <div>
                        <p className="text-sm text-gray-300">
                          Code sent to{" "}
                          <span className="text-teal-300">
                            {formData.email}
                          </span>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Check your inbox and spam folder
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      6-Digit Verification Code
                    </label>
                    <input
                      type="text"
                      name="verificationCode"
                      value={formData.verificationCode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-center text-2xl tracking-widest"
                      placeholder="123456"
                      maxLength="6"
                      pattern="\d{6}"
                      required
                    />
                    <div className="flex justify-between mt-2">
                      <p className="text-xs text-gray-500">
                        Enter the 6-digit code
                      </p>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="text-xs text-teal-400 hover:text-teal-300 transition-colors"
                      >
                        Change email
                      </button>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 py-3 bg-gray-800 text-gray-300 font-semibold rounded-lg hover:bg-gray-700 transition-all"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <span>Verifying...</span>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        </>
                      ) : (
                        <>
                          <span>Verify Code</span>
                          <FaArrowRight />
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              )}

              {/* Step 3: Set New Password */}
              {currentStep === 3 && !resetSuccess && (
                <form onSubmit={handleResetPassword} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLock className="text-gray-500" />
                      </div>
                      <input
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="w-full pl-10 pr-12 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        placeholder="••••••••"
                        minLength="8"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showNewPassword ? (
                          <FaEyeSlash className="text-gray-500 hover:text-gray-400" />
                        ) : (
                          <FaEye className="text-gray-500 hover:text-gray-400" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Must be at least 8 characters with letters and numbers
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaKey className="text-gray-500" />
                      </div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full pl-10 pr-12 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        placeholder="••••••••"
                        minLength="8"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showConfirmPassword ? (
                          <FaEyeSlash className="text-gray-500 hover:text-gray-400" />
                        ) : (
                          <FaEye className="text-gray-500 hover:text-gray-400" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Both passwords must match
                    </p>
                  </div>

                  <div className="flex space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="flex-1 py-3 bg-gray-800 text-gray-300 font-semibold rounded-lg hover:bg-gray-700 transition-all"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={
                        isLoading ||
                        formData.newPassword !== formData.confirmPassword ||
                        formData.newPassword.length < 8
                      }
                      className="flex-1 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <span>Resetting...</span>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        </>
                      ) : (
                        <>
                          <span>Reset Password</span>
                          <FaArrowRight />
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              )}

              {/* Navigation Links */}
              {!resetSuccess && (
                <div className="mt-8 pt-6 border-t border-gray-800 text-center">
                  <p className="text-gray-400">
                    Remember your password?{" "}
                    <a
                      href="/login"
                      className="text-teal-400 hover:text-teal-300 font-semibold transition-colors"
                    >
                      Back to login
                    </a>
                  </p>
                </div>
              )}

              {/* Security Note */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  <FaShieldAlt className="inline mr-1" />
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

export default ForgotPassword;

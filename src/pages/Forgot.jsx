// src/components/ForgotPassword.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaCheckCircle,
  FaKey,
  FaShieldAlt,
  FaStar,
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
    <div className="min-h-screen text-white overflow-hidden">
      {/* Background Image with Overlay - Stretched to fill */}
      <div className="fixed inset-0 z-0">
        {/* Background Image with full coverage */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://i.pinimg.com/1200x/11/e3/7d/11e37dbd7c0c06fe6659f35a3bf9d974.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        />

        {/* Yellow Semi-Transparent Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/30 via-yellow-600/20 to-black/80" />

        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(253,224,71,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          {/* Forgot Password Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-blue-900/90 to-blue-950/90 border border-yellow-500/30 rounded-3xl p-8 md:p-10 backdrop-blur-sm shadow-2xl"
          >
            {/* Form Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-yellow-500/10 px-4 py-2 rounded-full mb-4">
                <FaStar className="text-yellow-400" />
                <span className="text-yellow-400 font-medium">
                  Password Recovery
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-2">
                {resetSuccess
                  ? "Password Reset Successful"
                  : currentStep === 1
                    ? "Reset Your Password"
                    : currentStep === 2
                      ? "Verify Your Email"
                      : "Create New Password"}
              </h2>
              <p className="text-gray-300">
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
                className="mb-6 p-4 bg-yellow-900/20 border border-yellow-800/30 rounded-xl"
              >
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-yellow-400 text-xl" />
                  <div>
                    <p className="text-yellow-300 font-medium">
                      Password Reset Complete!
                    </p>
                    <p className="text-yellow-400/80 text-sm mt-1">
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
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-yellow-400/70" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-blue-900/40 border border-yellow-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all placeholder-gray-400"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    We'll send a verification code to this email
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-900 font-bold rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all flex items-center justify-center space-x-3 shadow-lg shadow-yellow-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <span>Sending...</span>
                      <div className="w-4 h-4 border-2 border-blue-900 border-t-transparent rounded-full animate-spin" />
                    </>
                  ) : (
                    <>
                      <span className="text-lg">Send Verification Code</span>
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </form>
            )}

            {/* Step 2: Enter Verification Code */}
            {currentStep === 2 && !resetSuccess && (
              <form onSubmit={handleVerifyCode} className="space-y-6">
                <div className="mb-4 p-4 bg-yellow-900/10 rounded-xl border border-yellow-500/20">
                  <div className="flex items-center space-x-3">
                    <FaShieldAlt className="text-yellow-400" />
                    <div>
                      <p className="text-sm text-gray-300">
                        Code sent to{" "}
                        <span className="text-yellow-300">
                          {formData.email}
                        </span>
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Check your inbox and spam folder
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    6-Digit Verification Code
                  </label>
                  <input
                    type="text"
                    name="verificationCode"
                    value={formData.verificationCode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-blue-900/40 border border-yellow-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all text-center text-2xl tracking-widest placeholder-gray-400"
                    placeholder="123456"
                    maxLength="6"
                    pattern="\d{6}"
                    required
                  />
                  <div className="flex justify-between mt-2">
                    <p className="text-xs text-gray-400">
                      Enter the 6-digit code
                    </p>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-xs text-yellow-400 hover:text-yellow-300 transition-colors"
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
                    className="flex-1 py-3 bg-blue-900/40 border border-yellow-500/20 text-gray-300 font-semibold rounded-xl hover:bg-blue-800/40 hover:border-yellow-500/30 transition-all"
                  >
                    Back
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-900 font-bold rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all flex items-center justify-center space-x-3 shadow-lg shadow-yellow-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <span>Verifying...</span>
                        <div className="w-4 h-4 border-2 border-blue-900 border-t-transparent rounded-full animate-spin" />
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
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-yellow-400/70" />
                    </div>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-3 bg-blue-900/40 border border-yellow-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all placeholder-gray-400"
                      placeholder="••••••••"
                      minLength="8"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-yellow-400 transition-colors"
                    >
                      {showNewPassword ? (
                        <FaEyeSlash className="text-gray-400 hover:text-yellow-400" />
                      ) : (
                        <FaEye className="text-gray-400 hover:text-yellow-400" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Must be at least 8 characters with letters and numbers
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaKey className="text-yellow-400/70" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-3 bg-blue-900/40 border border-yellow-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all placeholder-gray-400"
                      placeholder="••••••••"
                      minLength="8"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-yellow-400 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <FaEyeSlash className="text-gray-400 hover:text-yellow-400" />
                      ) : (
                        <FaEye className="text-gray-400 hover:text-yellow-400" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Both passwords must match
                  </p>
                </div>

                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="flex-1 py-3 bg-blue-900/40 border border-yellow-500/20 text-gray-300 font-semibold rounded-xl hover:bg-blue-800/40 hover:border-yellow-500/30 transition-all"
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
                    className="flex-1 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-900 font-bold rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all flex items-center justify-center space-x-3 shadow-lg shadow-yellow-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <span>Resetting...</span>
                        <div className="w-4 h-4 border-2 border-blue-900 border-t-transparent rounded-full animate-spin" />
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
              <div className="mt-8 pt-6 border-t border-yellow-500/20 text-center">
                <p className="text-gray-300">
                  Remember your password?{" "}
                  <a
                    href="/login"
                    className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors"
                  >
                    Back to login
                  </a>
                </p>
              </div>
            )}

            {/* Security Note */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-400">
                <FaShieldAlt className="inline mr-1" />
                Your data is secured with 256-bit SSL encryption
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

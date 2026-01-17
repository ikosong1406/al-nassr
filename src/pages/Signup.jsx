import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaChartLine,
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaCheck,
} from "react-icons/fa";

const Signup = ({ onNavigate }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic
    console.log("Signup data:", formData);
  };

  const passwordStrength = (password) => {
    if (!password) return { score: 0, label: "", color: "" };

    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const colors = [
      "bg-gray-700",
      "bg-red-500",
      "bg-orange-500",
      "bg-yellow-500",
      "bg-teal-400",
      "bg-teal-500",
    ];
    return { score, color: colors[score] };
  };

  const strength = passwordStrength(formData.password);

  return (
    <div className="text-white overflow-hidden">
      {/* Background Image with Overlay - Same as Login */}
      <div className="absolute inset-0 z-0">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://i.pinimg.com/1200x/11/e3/7d/11e37dbd7c0c06fe6659f35a3bf9d974.jpg')`,
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
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Brand & Value Proposition */}
            {/* <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="bg-gradient-to-br from-blue-800 to-blue-900 border border-yellow-500/20 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <FaCheck className="text-yellow-400 text-xl" />
                  <h3 className="text-lg font-bold">Secure Registration</h3>
                </div>
                <p className="text-gray-300 text-sm">
                  Your information is protected with bank-level security. All
                  data is encrypted and secure.
                </p>
              </div>
            </motion.div> */}

            {/* Right Column - Signup Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-blue-900 to-blue-950 border border-yellow-500/30 rounded-3xl p-8 md:p-10 backdrop-blur-sm"
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center space-x-2 bg-yellow-500/10 px-4 py-2 rounded-full mb-4">
                  <FaChartLine className="text-yellow-400" />
                  <span className="text-yellow-400 font-medium">
                    Create Your Account
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-2">
                  Join Al-Nassr Giveaways
                </h2>
                <p className="text-gray-400">
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
                        <FaUser className="text-yellow-400/70" />
                      </div>
                      <input
                        type="text"
                        className="w-full pl-10 pr-4 py-3 bg-blue-900/30 border border-yellow-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all placeholder-gray-500"
                        placeholder="John"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="text-yellow-400/70" />
                      </div>
                      <input
                        type="text"
                        className="w-full pl-10 pr-4 py-3 bg-blue-900/30 border border-yellow-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all placeholder-gray-500"
                        placeholder="Doe"
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
                      <FaEnvelope className="text-yellow-400/70" />
                    </div>
                    <input
                      type="email"
                      className="w-full pl-10 pr-4 py-3 bg-blue-900/30 border border-yellow-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all placeholder-gray-500"
                      placeholder="you@example.com"
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
                      <FaLock className="text-yellow-400/70" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full pl-10 pr-12 py-3 bg-blue-900/30 border border-yellow-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all placeholder-gray-500"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-yellow-400 transition-colors"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="text-gray-400" />
                      ) : (
                        <FaEye className="text-gray-400" />
                      )}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="mt-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-400">
                          Password strength
                        </span>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((index) => (
                            <div
                              key={index}
                              className={`w-2 h-2 rounded-full ${
                                index <= strength.score
                                  ? strength.color
                                  : "bg-gray-700"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-yellow-400/70" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="w-full pl-10 pr-12 py-3 bg-blue-900/30 border border-yellow-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all placeholder-gray-500"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-yellow-400 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <FaEyeSlash className="text-gray-400" />
                      ) : (
                        <FaEye className="text-gray-400" />
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
                    className="w-4 h-4 text-yellow-500 bg-blue-900/30 border-yellow-500/50 rounded focus:ring-yellow-500 focus:ring-2 mt-1"
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-300">
                    I agree to the{" "}
                    <button
                      type="button"
                      className="text-yellow-400 hover:text-yellow-300 underline"
                    >
                      Terms and Conditions
                    </button>{" "}
                    and{" "}
                    <button
                      type="button"
                      className="text-yellow-400 hover:text-yellow-300 underline"
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
                  className="w-full py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-900 font-semibold rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Create Account</span>
                  <FaArrowRight />
                </motion.button>
              </form>

              {/* Login Link */}
              <div className="mt-8 pt-6 border-t border-yellow-500/20 text-center">
                <p className="text-gray-400">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors"
                  >
                    Sign in
                  </a>
                </p>
              </div>

              {/* Security & Risk Disclosure */}
              <div className="mt-6 space-y-3">
                <p className="text-xs text-gray-500 text-center">
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

export default Signup;

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaFutbol,
  FaTrophy,
  FaShieldAlt,
  FaUserFriends,
  FaStar,
  FaCheck,
} from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen text-white overflow-hidden">
      {/* Background Image with Overlay */}
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

        {/* Keep your existing pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(253,224,71,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        </div>
      </div>

      {/* Main Content - Everything else stays EXACTLY the same */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Features & Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Security Card */}
              <div className="bg-gradient-to-br from-blue-800 to-blue-900 border border-yellow-500/20 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <FaShieldAlt className="text-yellow-400 text-xl" />
                  <h3 className="text-lg font-bold">Secure Login</h3>
                </div>
                <p className="text-gray-300 text-sm">
                  Your account is protected with bank-level security. All data
                  is encrypted and secure.
                </p>
              </div>
            </motion.div>

            {/* Right Column - Login Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-blue-900 to-blue-950 border border-yellow-500/30 rounded-3xl p-8 md:p-10 backdrop-blur-sm"
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center space-x-2 bg-yellow-500/10 px-4 py-2 rounded-full mb-4">
                  <FaStar className="text-yellow-400" />
                  <span className="text-yellow-400 font-medium">
                    Official Member Login
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-2">
                  Sign In to Your Account
                </h2>
                <p className="text-gray-400">
                  Access your giveaways and prizes
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
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
                      required
                      className="w-full pl-10 pr-4 py-3 bg-blue-900/30 border border-yellow-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all placeholder-gray-500"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
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
                      href="/forgot-password"
                      className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-yellow-400/70" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      className="w-full pl-10 pr-12 py-3 bg-blue-900/30 border border-yellow-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all placeholder-gray-500"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
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
                </div>

                {/* Remember Me & Forgot */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-yellow-500 bg-blue-900/30 border-yellow-500/50 rounded focus:ring-yellow-500 focus:ring-2"
                    />
                    <label
                      htmlFor="remember"
                      className="ml-2 text-sm text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-900 font-bold rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all flex items-center justify-center space-x-3 shadow-lg shadow-yellow-500/20"
                >
                  <span className="text-lg">Sign In</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </motion.button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-yellow-500/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-blue-900/50 text-gray-400">
                      Or
                    </span>
                  </div>
                </div>

                {/* Sign Up Link */}
                <div className="text-center pt-6 border-t border-yellow-500/20">
                  <p className="text-gray-400">
                    Don't have an account?{" "}
                    <a
                      href="/signup"
                      className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors"
                    >
                      Join Giveaways Now
                    </a>
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

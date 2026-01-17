import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaUserPlus,
  FaSignInAlt,
  FaFutbol,
} from "react-icons/fa";
import logo from "../assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-blue-900 backdrop-blur-sm border-b border-yellow-500/20"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center">
              <img src={logo} alt="Al-Nassr Logo" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-yellow-300 bg-clip-text text-transparent">
                Al-Nassr
              </h1>
            </div>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 text-yellow-300  rounded-lg hover:bg-yellow-400/10 transition-colors"
            >
              <a href="/login" className="flex items-center space-x-2">
                <FaSignInAlt />
                <span>Sign In</span>
              </a>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 bg-yellow-300  text-blue-900 rounded-lg transition-all"
            >
              <a href="/signup" className="flex items-center space-x-2">
                <FaUserPlus />
                <span>Join Giveaway</span>
              </a>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 hover:text-yellow-300"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4"
          >
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-3 pt-4">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center space-x-2 py-3 text-yellow-300  rounded-lg"
                >
                  <a href="/login" className="flex items-center space-x-2">
                    <FaSignInAlt />
                    <span>Sign In</span>
                  </a>
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center space-x-2 py-3 bg-yellow-300  text-blue-900 rounded-lg"
                >
                  <a href="/signup" className="flex items-center space-x-2">
                    <FaUserPlus />
                    <span>Join Giveaway</span>
                  </a>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;

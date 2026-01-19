import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaFutbol, FaDollarSign } from "react-icons/fa";
import ronaldo from "../assets/ronaldo.png";
import mane from "../assets/sadio.png";
import felix from "../assets/felix.png";

const rotatingPlayers = [
  {
    name: "Cristiano Ronaldo",
    position: "Forward",
    jerseyNumber: "CR7",
    stats: { goals: 35, assists: 12, appearances: 42, rating: 9.2 },
    image: ronaldo,
  },
  {
    name: "Sadio Mané",
    position: "Midfielder",
    jerseyNumber: "M10",
    stats: { goals: 22, assists: 15, appearances: 38, rating: 8.7 },
    image: mane,
  },
  {
    name: "João Félix",
    position: "Forward",
    jerseyNumber: "J79",
    stats: { goals: 8, assists: 25, appearances: 40, rating: 8.5 },
    image: felix,
  },
];

const scrollToSection =
  (href, setIsMenuOpen = null) =>
  (e) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    if (setIsMenuOpen) {
      setIsMenuOpen(false);
    }
  };

const Hero = () => {
  const [countdown, setCountdown] = useState({
    days: 7,
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        const newSeconds = prev.seconds - 1;
        if (newSeconds < 0) {
          const newMinutes = prev.minutes - 1;
          if (newMinutes < 0) {
            const newHours = prev.hours - 1;
            if (newHours < 0) {
              const newDays = prev.days - 1;
              if (newDays < 0) {
                clearInterval(timer);
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
              }
              return { days: newDays, hours: 23, minutes: 59, seconds: 59 };
            }
            return { ...prev, hours: newHours, minutes: 59, seconds: 59 };
          }
          return { ...prev, minutes: newMinutes, seconds: 59 };
        }
        return { ...prev, seconds: newSeconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Player rotation effect - every 10 seconds
  useEffect(() => {
    const playerTimer = setInterval(() => {
      setCurrentPlayerIndex((prev) => (prev + 1) % rotatingPlayers.length);
    }, 10000); // 10 seconds

    return () => clearInterval(playerTimer);
  }, []);

  const jackpotSAR = 200000000;
  const jackpotUSD = (jackpotSAR * 0.27).toLocaleString();
  const currentPlayer = rotatingPlayers[currentPlayerIndex];

  return (
    <section
      id="hero"
      className="relative pt-10 flex items-center overflow-hidden lg:pt-0"
      style={{
        background:
          "linear-gradient(180deg, #0c1b33 0%, #1e3a8a 50%, #3b82f6 100%)",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>

      {/* Clean Cut for Next Sections */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 lg:h-24"
        style={{
          background: "linear-gradient(to top, #0c1b33 0%, transparent 100%)",
          clipPath: "polygon(0% 100%, 100% 0%, 100% 100%, 0% 100%)",
        }}
      ></div>

      <div className="container mx-auto px-4 py-6 lg:py-8 relative z-10">
        {/* Mobile Layout (stacked) */}
        <div className="lg:hidden flex flex-col">
          {/* Top Section: Player Info (Name & Stats in Flex) */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPlayer.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Player Name & Position - Inline flex */}
                <div className="flex flex-col sm:flex-row sm:items-end gap-3 mb-4">
                  <div className="flex-1">
                    <h1 className="text-4xl sm:text-4xl font-black text-white leading-tight">
                      <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                        {currentPlayer.name.split(" ")[0]}
                      </span>
                      <br />
                      <span className="text-3xl sm:text-3xl">
                        {currentPlayer.name.split(" ").slice(1).join(" ")}
                      </span>
                    </h1>
                  </div>
                  <div className="inline-flex items-center space-x-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full px-4 py-2 self-start">
                    <FaFutbol className="text-yellow-300" />
                    <span className="text-yellow-300 font-bold">
                      {currentPlayer.position}
                    </span>
                  </div>
                </div>

                {/* Stats Boxes - Horizontal scroll for mobile */}
                <div className="flex space-x-3 overflow-x-auto pb-2 mb-4 scrollbar-hide">
                  {Object.entries(currentPlayer.stats).map(([key, value]) => (
                    <motion.div
                      key={key}
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                      whileHover={{ scale: 1.05 }}
                      className="flex-shrink-0 bg-blue-900/50 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-4 min-w-[120px] text-center"
                    >
                      <div className="text-xl font-bold text-white mb-1">
                        {value}
                      </div>
                      <div className="text-xs text-gray-300 uppercase tracking-wider">
                        {key}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Player Rotation Indicator */}
                <div className="flex justify-center space-x-2 mb-4">
                  {rotatingPlayers.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPlayerIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentPlayerIndex
                          ? "bg-yellow-300 w-6"
                          : "bg-gray-600 hover:bg-gray-500"
                      }`}
                      aria-label={`View ${rotatingPlayers[index].name}`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Middle Section: Player Image with Large Jersey Number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mb-6"
          >
            {/* Jersey Number - Very large and visible on mobile */}
            <motion.div
              key={currentPlayer.jerseyNumber}
              initial={{ rotate: 0, opacity: 0 }}
              animate={{ rotate: 15, opacity: 0.4 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="text-[200px] sm:text-[250px] font-black text-white/50 leading-none select-none">
                {currentPlayer.jerseyNumber}
              </div>
            </motion.div>

            {/* Player Image - Smaller but centered */}
            <div className="relative z-10 flex justify-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentPlayer.image}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  src={currentPlayer.image}
                  alt={currentPlayer.name}
                  className="w-[200px] sm:w-[250px] mx-auto"
                />
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Bottom Section: Countdown Timer & Jackpot */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Jackpot Display */}
            <motion.div
              initial={{ rotate: 0, opacity: 0 }}
              animate={{ rotate: 3, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-700/20 border-2 border-yellow-500/30 rounded-2xl p-5 backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-gray-300 mb-3 text-lg font-semibold">
                    Prizes Worth
                  </div>

                  {/* Saudi Riyal */}
                  <div className="mb-3">
                    <div className="text-2xl sm:text-3xl font-black text-white">
                      {jackpotSAR.toLocaleString()} SAR
                    </div>
                    <div className="text-gray-400 text-xs mt-1">
                      Saudi Riyal
                    </div>
                  </div>

                  {/* USD Equivalent */}
                  <div className="pt-3 border-t border-yellow-500/20">
                    <div className="inline-flex items-center space-x-2 text-yellow-300">
                      <FaDollarSign />
                      <span className="text-lg sm:text-xl font-bold">
                        ${jackpotUSD}
                      </span>
                    </div>
                    <div className="text-gray-400 text-xs mt-1">
                      USD Equivalent
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-6 py-4 bg-yellow-300 text-blue-900 rounded-xl font-bold text-lg transition-all shadow-lg shadow-yellow-500/30"
            >
              <a
                href="/signup"
                className="flex items-center justify-center space-x-3"
              >
                <span>Enter Giveaway Now</span>
                <FaArrowRight />
              </a>
            </motion.button>
          </motion.div>
        </div>

        {/* Desktop Layout (3 columns) */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 items-center min-h-[70vh]">
          {/* Left Section - Player Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="h-full flex flex-col justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPlayer.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="text-right"
              >
                {/* Player Name - Big and Bold */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                    {currentPlayer.name.split(" ")[0]}
                  </span>
                  <br />
                  <span className="text-white text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                    {currentPlayer.name.split(" ").slice(1).join(" ")}
                  </span>
                </h1>

                {/* Position */}
                <div className="inline-flex items-center space-x-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full px-6 py-2 mb-8">
                  <FaFutbol className="text-yellow-400" />
                  <span className="text-yellow-400 text-lg font-bold">
                    {currentPlayer.position}
                  </span>
                </div>

                {/* Stats Boxes */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {Object.entries(currentPlayer.stats).map(([key, value]) => (
                    <motion.div
                      key={key}
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="bg-blue-900/50 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-4 text-center"
                    >
                      <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                        {value}
                      </div>
                      <div className="text-xs md:text-sm text-gray-300 uppercase tracking-wider">
                        {key}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Player Rotation Indicator */}
                <div className="flex justify-end space-x-2 mb-6">
                  {rotatingPlayers.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPlayerIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentPlayerIndex
                          ? "bg-yellow-500 w-8"
                          : "bg-gray-600 hover:bg-gray-500"
                      }`}
                      aria-label={`View ${rotatingPlayers[index].name}`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Middle Section - Player Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-full flex flex-col justify-center relative"
          >
            {/* Jersey Number (225 degrees rotation) */}
            <motion.div
              key={currentPlayer.jerseyNumber}
              initial={{ rotate: 0, opacity: 0 }}
              animate={{ rotate: 20, opacity: 0.4 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="text-[400px] md:text-[300px] lg:text-[400px] font-black text-white leading-none select-none">
                {currentPlayer.jerseyNumber}
              </div>
            </motion.div>

            {/* Player Image */}
            <div className="relative z-10">
              <div className="relative mx-auto">
                <div className="relative w-[300px]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentPlayer.image}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      src={currentPlayer.image}
                      alt={currentPlayer.name}
                      className="w-full h-full"
                    />
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Section - Timer & Jackpot */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-full flex flex-col justify-center"
          >
            {/* Countdown Timer */}
            <div className="mb-8 lg:mb-12">
              <div className="text-gray-300 mb-4 text-lg font-semibold text-center lg:text-left">
                Time Remaining
              </div>
              <div className="flex gap-3 md:gap-4 justify-center lg:justify-start">
                {Object.entries(countdown).map(([unit, value]) => (
                  <div key={unit} className="text-center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="w-16 h-20 md:w-20 md:h-24 bg-gradient-to-b from-blue-800/60 to-blue-900/60 border border-yellow-500/30 rounded-xl flex flex-col items-center justify-center shadow-lg"
                    >
                      <div className="text-2xl md:text-3xl font-bold text-white">
                        {value.toString().padStart(2, "0")}
                      </div>
                      <div className="text-xs text-yellow-300 uppercase mt-1 font-semibold">
                        {unit}
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            {/* Jackpot Display (135 degrees rotation) */}
            <motion.div
              initial={{ rotate: 0, opacity: 0 }}
              animate={{ rotate: 5, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="transform-gpu mb-8 lg:mb-12"
              style={{ transformOrigin: "center center" }}
            >
              <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-700/20 border-2 border-yellow-500/30 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-gray-300 mb-3 text-lg font-semibold">
                    Prizes Worth
                  </div>

                  {/* Saudi Riyal */}
                  <div className="mb-3">
                    <div className="text-3xl md:text-4xl font-black text-white">
                      {jackpotSAR.toLocaleString()} SAR
                    </div>
                    <div className="text-gray-400 text-xs mt-1">
                      Saudi Riyal
                    </div>
                  </div>

                  {/* USD Equivalent */}
                  <div className="pt-3 border-t border-yellow-500/20">
                    <div className="inline-flex items-center space-x-2 text-yellow-300">
                      <FaDollarSign />
                      <span className="text-xl md:text-2xl font-bold">
                        ${jackpotUSD}
                      </span>
                    </div>
                    <div className="text-gray-400 text-xs mt-1">
                      USD Equivalent
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 md:px-8 md:py-4 bg-yellow-300 text-blue-900 rounded-xl font-bold text-base md:text-lg hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-lg shadow-yellow-500/30"
              >
                <a
                  href="/signup"
                  className="flex items-center justify-center space-x-2 md:space-x-3"
                >
                  <span>Enter Giveaway Now</span>
                  <FaArrowRight />
                </a>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBullhorn,
  FaPlayCircle,
  FaGift,
  FaCoins,
  FaCheckCircle,
  FaShippingFast,
  FaDollarSign,
  FaBoxOpen,
  FaClock,
  FaShieldAlt,
} from "react-icons/fa";

const Home = () => {
  const [activeNewsIndex, setActiveNewsIndex] = useState(0);
  const [activeGiftIndex, setActiveGiftIndex] = useState(0);
  const [showShippingModal, setShowShippingModal] = useState(false);
  const [selectedGift, setSelectedGift] = useState(null);

  // Club News Carousel
  const [newsFeed, setNewsFeed] = useState([
    {
      id: 1,
      type: "match",
      title: "Historic 3-0 Victory in Derby Match",
      content:
        "The team delivered a masterclass performance last night, securing a decisive 3-0 victory against our biggest rivals. CR7 scored a stunning hat-trick.",
      imageUrl:
        "https://i.pinimg.com/736x/45/8c/7f/458c7fd6a82709b6738c7bb6ae22e14a.jpg",
      timestamp: "2 hours ago",
      likes: 245,
      comments: 42,
      isVideo: false,
      playerHighlight: "CR7 - Hat Trick Hero",
      categoryColor: "from-red-500/30 to-red-600/20",
    },
    {
      id: 2,
      type: "training",
      title: "Pre-Season Training Camp in Dubai",
      content:
        "The squad is undergoing intensive training in Dubai ahead of the new season. New signings are already making an impression.",
      imageUrl:
        "https://i.pinimg.com/736x/67/89/4b/67894b38a5590dc07a50b3f56b438b19.jpg",
      timestamp: "5 hours ago",
      likes: 189,
      comments: 18,
      isVideo: true,
      playerHighlight: "New Signing Impresses",
      categoryColor: "from-green-500/30 to-green-600/20",
    },
    {
      id: 3,
      type: "announcement",
      title: "$50M Stadium Upgrade Announced",
      content:
        "Major renovations coming to our home stadium including new VIP suites, expanded seating, and state-of-the-art facilities.",
      imageUrl:
        "https://i.pinimg.com/736x/89/5b/4a/895b4a84944f22c63ffbb2b0d8d852e1.jpg",
      timestamp: "1 day ago",
      likes: 512,
      comments: 67,
      isVideo: false,
      playerHighlight: null,
      categoryColor: "from-yellow-500/30 to-yellow-600/20",
    },
    {
      id: 4,
      type: "player",
      title: "Captain Signs 5-Year Contract Extension",
      content:
        "Our star midfielder commits his future to the club with a record-breaking contract extension.",
      imageUrl:
        "https://i.pinimg.com/736x/32/dc/7e/32dc7e86d31d5dde15d5c8ddf2d1a966.jpg",
      timestamp: "2 days ago",
      likes: 890,
      comments: 124,
      isVideo: false,
      playerHighlight: "Captain Commits Future",
      categoryColor: "from-blue-500/30 to-blue-600/20",
    },
  ]);

  // Tasks Section
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Daily Check-in",
      description: "Visit the app daily",
      reward: 50,
      status: "claimable",
      icon: "🎯",
      color: "from-green-500 to-emerald-600",
    },
    {
      id: 2,
      title: "Share Match Highlights",
      description: "Share latest match highlights",
      reward: 100,
      status: "available",
      icon: "📢",
      color: "from-blue-500 to-cyan-600",
    },
    {
      id: 3,
      title: "Predict Match Result",
      description: "Predict next match score",
      reward: 200,
      status: "in-progress",
      icon: "🎮",
      color: "from-purple-500 to-pink-600",
    },
    {
      id: 4,
      title: "Complete Profile",
      description: "Fill your profile details",
      reward: 150,
      status: "available",
      icon: "👤",
      color: "from-yellow-500 to-amber-600",
    },
  ]);

  // Won Gifts Carousel
  const [gifts, setGifts] = useState([
    {
      id: 1,
      name: "Cristiano Ronaldo Match-Worn Jersey",
      contest: "Golden Boot Predictor",
      status: "claimable",
      imageUrl:
        "https://i.pinimg.com/736x/ca/87/10/ca8710a8ba6bdf46d662a1f4d20a0a36.jpg",
      valueSAR: "2,500,000 SAR",
      valueUSD: "$675,000",
      expiresIn: "7 days",
      isConvertible: true,
      cardColor: "from-yellow-400 via-yellow-500 to-amber-600",
      includes: [
        "Match Authentication Certificate",
        "Player Signature",
        "Premium Framing",
        "Insurance Papers",
      ],
    },
    {
      id: 2,
      name: "Lamborghini Aventador SVJ",
      contest: "Supercar Giveaway",
      status: "claimable",
      imageUrl:
        "https://i.pinimg.com/736x/0a/7b/71/0a7b71cc1ac99242473e529606db4599.jpg",
      valueSAR: "12,000,000 SAR",
      valueUSD: "$3,240,000",
      expiresIn: "14 days",
      isConvertible: false,
      cardColor: "from-red-500 via-red-600 to-pink-600",
      includes: [
        "Full Manufacturer Warranty",
        "Custom Paint Job",
        "VIP Delivery Service",
        "5 Years Insurance",
      ],
    },
    {
      id: 3,
      name: "Dubai Marina Penthouse",
      contest: "Property Lottery",
      status: "claimable",
      imageUrl:
        "https://i.pinimg.com/736x/c9/4c/44/c94c448ca991dc58a94c459cf1961a12.jpg",
      valueSAR: "35,000,000 SAR",
      valueUSD: "$9,450,000",
      expiresIn: "30 days",
      isConvertible: true,
      cardColor: "from-emerald-500 via-teal-600 to-cyan-600",
      includes: [
        "Full Furnishing",
        "2 Parking Spaces",
        "Private Pool Access",
        "Smart Home System",
      ],
    },
  ]);

  // Handle task actions
  const handleTaskAction = (taskId, action) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        if (action === "start") {
          return { ...task, status: "in-progress" };
        } else if (action === "claim") {
          return { ...task, status: "completed" };
        }
      }
      return task;
    });
    setTasks(updatedTasks);

    if (action === "claim") {
      const task = tasks.find((t) => t.id === taskId);
      alert(`🎉 You earned ${task.reward} points!`);
    }
  };

  // Handle gift conversion
  const handleConvertGift = (gift) => {
    const usdValue = parseFloat(gift.valueUSD.replace(/[^0-9.-]+/g, ""));
    const coins = Math.floor(usdValue / 100); // 1% conversion rate
    if (
      window.confirm(`Convert ${gift.name} to ${coins.toLocaleString()} coins?`)
    ) {
      const updatedGifts = gifts.map((g) =>
        g.id === gift.id ? { ...g, status: "converted" } : g,
      );
      setGifts(updatedGifts);
      alert(`💰 ${gift.name} converted to ${coins.toLocaleString()} coins!`);
    }
  };

  // Handle gift claim (opens shipping modal)
  const handleClaimGift = (gift) => {
    setSelectedGift(gift);
    setShowShippingModal(true);
  };

  // Handle shipping confirmation
  const handleConfirmShipping = () => {
    if (!selectedGift) return;

    const usdValue = parseFloat(
      selectedGift.valueUSD.replace(/[^0-9.-]+/g, ""),
    );
    const shippingCost = Math.max(10000, usdValue * 0.05); // Minimum $10,000 or 5% of value
    const formattedShipping = shippingCost.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

    // WhatsApp message template
    const message =
      `Hello, I would like to arrange shipping for my prize:\n\n` +
      `Prize: ${selectedGift.name}\n` +
      `Value: ${selectedGift.valueUSD}\n` +
      `Estimated Shipping: ${formattedShipping}\n` +
      `Please provide shipping details and payment instructions.`;

    const whatsappUrl = `https://wa.me/+2347012571616?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");

    // Update gift status
    const updatedGifts = gifts.map((g) =>
      g.id === selectedGift.id ? { ...g, status: "processing" } : g,
    );
    setGifts(updatedGifts);
    setShowShippingModal(false);
    setSelectedGift(null);
  };

  // Navigation for news carousel
  const nextNews = () => {
    setActiveNewsIndex((prev) => (prev >= newsFeed.length - 1 ? 0 : prev + 1));
  };

  const prevNews = () => {
    setActiveNewsIndex((prev) => (prev <= 0 ? newsFeed.length - 1 : prev - 1));
  };

  // Navigation for gifts carousel
  const nextGift = () => {
    setActiveGiftIndex((prev) => (prev >= gifts.length - 1 ? 0 : prev + 1));
  };

  const prevGift = () => {
    setActiveGiftIndex((prev) => (prev <= 0 ? gifts.length - 1 : prev - 1));
  };

  // Auto-rotate news
  useEffect(() => {
    const interval = setInterval(() => {
      nextNews();
    }, 6000);
    return () => clearInterval(interval);
  }, [activeNewsIndex]);

  return (
    <div className="min-h-screen text-white">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto md:p-6">
        {/* Club News Carousel */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-br from-blue-500/30 to-blue-600/20 rounded-lg">
                <FaBullhorn className="text-blue-300" />
              </div>
              <h2 className="text-base font-bold text-white">
                Latest Club News
              </h2>
            </div>
            <div className="text-sm text-blue-300">
              {activeNewsIndex + 1} of {newsFeed.length}
            </div>
          </div>

          {/* News Carousel */}
          <div className="relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20">
              <button
                onClick={prevNews}
                className="p-3 bg-gradient-to-r from-blue-800/80 to-blue-900/80 rounded-full border border-blue-700/50 hover:border-blue-600/50 transition-all duration-300 shadow-lg"
              >
                <FaChevronLeft className="w-4 h-4" />
              </button>
            </div>

            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20">
              <button
                onClick={nextNews}
                className="p-3 bg-gradient-to-r from-blue-800/80 to-blue-900/80 rounded-full border border-blue-700/50 hover:border-blue-600/50 transition-all duration-300 shadow-lg"
              >
                <FaChevronRight className="w-4 h-4" />
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeNewsIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-blue-800/40 to-blue-900/20 rounded-2xl overflow-hidden border border-blue-700/30 backdrop-blur-sm"
              >
                <div className="relative">
                  {/* News Image */}
                  <div className="relative h-[200px] overflow-hidden">
                    <img
                      src={newsFeed[activeNewsIndex].imageUrl}
                      alt={newsFeed[activeNewsIndex].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-transparent to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <div
                        className={`px-4 py-2 bg-gradient-to-r ${newsFeed[activeNewsIndex].categoryColor} rounded-full border border-white/20`}
                      >
                        <span className="text-sm font-bold capitalize">
                          {newsFeed[activeNewsIndex].type}
                        </span>
                      </div>
                    </div>

                    {/* Video Indicator */}
                    {newsFeed[activeNewsIndex].isVideo && (
                      <div className="absolute top-4 right-4">
                        <div className="p-2 bg-gradient-to-r from-red-500 to-red-600 rounded-full">
                          <FaPlayCircle className="text-white" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* News Content */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-base font-bold text-white mb-2">
                        {newsFeed[activeNewsIndex].title}
                      </h3>
                      <p className="text-blue-200">
                        {newsFeed[activeNewsIndex].content}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Tasks Section - Earn Points */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-white ml-2">
                Earn Points Now
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-blue-800/40 to-blue-900/20 rounded-2xl p-4 border border-blue-700/30 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-br ${task.color}`}
                    >
                      <span className="text-xl">{task.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{task.title}</h3>
                      <p className="text-sm text-blue-300">
                        {task.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-yellow-400">
                      +{task.reward}
                    </div>
                    <div className="text-xs text-blue-300">points</div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center justify-between">
                  <div>
                    {task.status === "available" && (
                      <span className="px-3 py-1 bg-blue-700/30 text-blue-300 text-xs rounded-full">
                        Available
                      </span>
                    )}
                    {task.status === "in-progress" && (
                      <span className="px-3 py-1 bg-yellow-700/30 text-yellow-300 text-xs rounded-full">
                        In Progress
                      </span>
                    )}
                    {task.status === "claimable" && (
                      <span className="px-3 py-1 bg-green-700/30 text-green-300 text-xs rounded-full">
                        Ready to Claim
                      </span>
                    )}
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() =>
                      task.status === "available"
                        ? handleTaskAction(task.id, "start")
                        : task.status === "claimable"
                          ? handleTaskAction(task.id, "claim")
                          : null
                    }
                    disabled={
                      task.status === "in-progress" ||
                      task.status === "completed"
                    }
                    className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                      task.status === "available"
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                        : task.status === "claimable"
                          ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                          : "bg-blue-900/50 text-blue-500 cursor-not-allowed"
                    }`}
                  >
                    {task.status === "available" && "Start"}
                    {task.status === "in-progress" && "In Progress"}
                    {task.status === "claimable" && "Claim"}
                    {task.status === "completed" && "Completed"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Won Gifts Carousel */}
        {gifts.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gradient-to-br from-yellow-500/30 to-yellow-600/20 rounded-lg">
                  <FaGift className="text-yellow-300" />
                </div>
                <h2 className="text-base font-bold text-white">
                  Your Won Prizes
                </h2>
              </div>
              <div className="text-sm text-blue-300">
                {gifts.filter((g) => g.status === "claimable").length} to claim
              </div>
            </div>

            {/* Gifts Carousel */}
            <div className="relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20">
                <button
                  onClick={prevGift}
                  className="p-3 bg-gradient-to-r from-blue-800/80 to-blue-900/80 rounded-full border border-blue-700/50 hover:border-blue-600/50 transition-all duration-300 shadow-lg"
                >
                  <FaChevronLeft className="w-4 h-4" />
                </button>
              </div>

              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20">
                <button
                  onClick={nextGift}
                  className="p-3 bg-gradient-to-r from-blue-800/80 to-blue-900/80 rounded-full border border-blue-700/50 hover:border-blue-600/50 transition-all duration-300 shadow-lg"
                >
                  <FaChevronRight className="w-4 h-4" />
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeGiftIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-br from-blue-800/40 to-blue-900/20 rounded-2xl overflow-hidden border border-blue-700/30 backdrop-blur-sm p-6"
                >
                  <div className="relative">
                    {/* Gift Card Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div>
                          <p className="text-sm text-blue-300">YOU WON!</p>
                          <h3 className="text-xl font-bold text-white">
                            {gifts[activeGiftIndex].name}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Gift Image */}
                    <div className="relative h-48 rounded-xl overflow-hidden mb-6">
                      <img
                        src={gifts[activeGiftIndex].imageUrl}
                        alt={gifts[activeGiftIndex].name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent" />

                      {/* Value Badge */}
                      <div className="absolute bottom-4 left-4">
                        <div className="px-4 py-2 bg-gradient-to-r from-yellow-600/90 to-yellow-700/90 rounded-lg border border-yellow-500/50">
                          <div className="text-sm font-bold text-white">
                            Value
                          </div>
                          <div className="text-lg font-bold text-yellow-300">
                            {gifts[activeGiftIndex].valueUSD}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Gift Details */}
                    <div className="mb-6">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="p-3 bg-blue-900/30 rounded-lg border border-blue-700/30">
                          <div className="text-sm text-blue-300 mb-1">
                            From Contest
                          </div>
                          <div className="font-bold text-white">
                            {gifts[activeGiftIndex].contest}
                          </div>
                        </div>
                        <div className="p-3 bg-blue-900/30 rounded-lg border border-blue-700/30">
                          <div className="text-sm text-blue-300 mb-1">
                            Expires In
                          </div>
                          <div className="font-bold text-white">
                            {gifts[activeGiftIndex].expiresIn}
                          </div>
                        </div>
                      </div>

                      {/* Includes Section */}
                      <div className="mb-6">
                        <div className="text-sm text-blue-300 mb-2">
                          Includes:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {gifts[activeGiftIndex].includes
                            .slice(0, 3)
                            .map((item, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-blue-900/40 text-blue-200 text-sm rounded-full border border-blue-700/50"
                              >
                                {item}
                              </span>
                            ))}
                          {gifts[activeGiftIndex].includes.length > 3 && (
                            <span className="px-3 py-1 bg-blue-900/40 text-blue-200 text-sm rounded-full border border-blue-700/50">
                              +{gifts[activeGiftIndex].includes.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleClaimGift(gifts[activeGiftIndex])}
                        className="flex-1 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        <FaGift />
                        <span>Claim Gift</span>
                      </button>

                      {gifts[activeGiftIndex].isConvertible && (
                        <button
                          onClick={() =>
                            handleConvertGift(gifts[activeGiftIndex])
                          }
                          className="flex-1 py-3 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center space-x-2"
                        >
                          <FaCoins />
                          <span>Convert</span>
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Gifts Pagination */}
              <div className="flex justify-center items-center mt-6 space-x-2">
                {gifts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveGiftIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeGiftIndex
                        ? "w-6 bg-gradient-to-r from-yellow-400 to-yellow-600"
                        : "bg-blue-700 hover:bg-blue-600"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Shipping Modal */}
      <AnimatePresence>
        {showShippingModal && selectedGift && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 z-50"
            onClick={() => setShowShippingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-2xl w-full max-w-2xl overflow-hidden border border-blue-700/50 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-3 border-b border-blue-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-br from-green-500/30 to-green-600/20 rounded-lg">
                      <FaShippingFast className="text-green-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">
                        Shipping Details
                      </h2>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowShippingModal(false)}
                    className="p-2 hover:bg-blue-700/50 rounded-lg transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-3 max-h-[70vh] overflow-y-auto">
                {/* Prize Info */}
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-900/30 to-blue-800/20 rounded-xl border border-blue-700/30">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden">
                      <img
                        src={selectedGift.imageUrl}
                        alt={selectedGift.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">
                        {selectedGift.name}
                      </h3>
                      <div className="text-blue-300 text-sm">
                        {selectedGift.valueUSD}
                      </div>
                    </div>
                  </div>
                </div>

                {/* What's Included */}
                <div className="mb-6">
                  <h4 className="font-bold text-white mb-3 flex items-center">
                    <FaBoxOpen className="mr-2 text-yellow-400" />
                    What's Included
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedGift.includes.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center space-x-2 p-2 bg-blue-900/30 rounded-lg"
                      >
                        <FaCheckCircle className="text-green-400 flex-shrink-0" />
                        <span className="text-blue-200 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Details */}
                <div className="mb-6">
                  <h4 className="font-bold text-white mb-3 flex items-center">
                    <FaShippingFast className="mr-2 text-blue-400" />
                    Shipping Information
                  </h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-900/30 rounded-lg border border-blue-700/30">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <FaShieldAlt className="text-green-400" />
                          <span className="font-bold text-blue-300">
                            Shipping Partner
                          </span>
                        </div>
                        <span className="text-white font-bold">
                          DHL Express
                        </span>
                      </div>
                      <p className="text-blue-200 text-sm">
                        Worldwide insured shipping with real-time tracking and
                        signature confirmation.
                      </p>
                    </div>

                    <div className="p-3 bg-blue-900/30 rounded-lg border border-blue-700/30">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <FaClock className="text-yellow-400" />
                          <span className="font-bold text-blue-300">
                            Processing Time
                          </span>
                        </div>
                        <span className="text-white font-bold">
                          3-7 business days
                        </span>
                      </div>
                      <p className="text-blue-200 text-sm">
                        After payment confirmation, your item will be prepared
                        for shipment.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="mb-6">
                  <h4 className="font-bold text-white mb-3 flex items-center">
                    <FaDollarSign className="mr-2 text-green-400" />
                    Cost Breakdown
                  </h4>
                  <div className="bg-blue-900/20 rounded-xl border border-blue-700/30">
                    <div className="divide-y divide-blue-800/50">
                      <div className="p-4 flex justify-between items-center bg-gradient-to-r from-blue-800/40 to-blue-900/40">
                        <div>
                          <div className="font-bold text-white">Total Cost</div>
                          <div className="text-sm text-blue-300">
                            Shipping only
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-yellow-400">
                            $
                            {Math.max(
                              10000,
                              parseFloat(
                                selectedGift.valueUSD.replace(/[^0-9.-]+/g, ""),
                              ) * 0.05,
                            ).toLocaleString("en-US")}
                          </div>
                          <div className="text-sm text-blue-300">
                            Shipping fee
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Important Notes */}
                <div className="mb-6 p-4 bg-gradient-to-r from-yellow-600/20 to-yellow-700/10 rounded-xl border border-yellow-500/30">
                  <div className="flex items-start space-x-3">
                    <div>
                      <h4 className="font-bold text-yellow-300 mb-1">
                        Important Notes
                      </h4>
                      <ul className="text-blue-200 text-sm space-y-1">
                        <li>
                          • Shipping costs are non-refundable once payment is
                          made
                        </li>
                        <li>
                          • You'll receive tracking information within 24 hours
                          of shipment
                        </li>
                        <li>
                          • All shipments are fully insured against loss or
                          damage
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowShippingModal(false)}
                    className="flex-1 py-3 bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 rounded-xl font-semibold transition-all duration-300 border border-blue-700/50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmShipping}
                    className="flex-1 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-xl font-bold transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Continue</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Missing Chevron Icons Component */}
      <style jsx>{`
        .FaChevronLeft,
        .FaChevronRight {
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

// Add missing icons at the top
const FaChevronLeft = () => <span>‹</span>;
const FaChevronRight = () => <span>›</span>;

export default Home;

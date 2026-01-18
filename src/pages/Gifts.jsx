// src/pages/Giveaways.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTrophy,
  FaGift,
  FaClock,
  FaUsers,
  FaDollarSign,
  FaCar,
  FaHome,
  FaPlane,
  FaStar,
  FaCheckCircle,
  FaTicketAlt,
  FaCrown,
  FaShoppingBag,
  FaGamepad,
  FaGem,
  FaCoins,
  FaShieldAlt,
  FaMedal,
  FaFire,
  FaPercentage,
  FaChevronLeft,
  FaChevronRight,
  // FaTicket,
  FaTag,
  FaAward,
  FaBoxOpen,
} from "react-icons/fa";

const Giveaways = () => {
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [userPoints, setUserPoints] = useState(250); // User's available points

  // Handle responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const prizes = [
    {
      id: 1,
      title: "Cristiano Ronaldo Match-Worn Jersey",
      category: "Sports Memorabilia",
      marketValueSAR: "2,500,000 SAR",
      marketValueUSD: "$675,000",
      description:
        "Official home jersey worn by CR7 during Champions League final match.",
      entryCost: 50,
      timeRemaining: { hours: 12, minutes: 45 },
      totalEntries: 1250,
      userEntries: 3,
      maxEntries: 100,
      convertible: true,
      color: "from-yellow-400 via-yellow-500 to-amber-600",
      rarity: "Ultra Rare",
      badge: "Iconic",
      features: [
        "Match Authenticated",
        "Player Signed",
        "Framing Included",
        "Certificate of Authenticity",
      ],
      rating: 5,
      isPopular: true,
      collectorGrade: "A++",
      imageUrl:
        "https://i.pinimg.com/736x/ca/87/10/ca8710a8ba6bdf46d662a1f4d20a0a36.jpg",
      winnerCount: 1,
      requirements: "Must be 18+ years old, Worldwide shipping included",
      details: {
        fullDescription:
          "This is the actual jersey worn by Cristiano Ronaldo during the 2023 Champions League final. Includes full authentication from UEFA and Nike.",
        shippingInfo: "Free worldwide insured shipping via DHL Express",
        authentication: "Comes with hologram certificate and verification code",
        restrictions: "Cannot be resold within 1 year of receipt",
        claimProcess:
          "Winner will be contacted within 24 hours of draw completion",
      },
    },
    {
      id: 2,
      title: "Lamborghini Aventador SVJ",
      category: "Luxury Supercar",
      marketValueSAR: "12,000,000 SAR",
      marketValueUSD: "$3,240,000",
      description:
        "2024 Lamborghini Aventador SVJ in custom spec with full options.",
      entryCost: 200,
      timeRemaining: { days: 2, hours: 6, minutes: 30 },
      totalEntries: 8900,
      userEntries: 1,
      maxEntries: 50,
      convertible: false,
      color: "from-red-500 via-red-600 to-pink-600",
      rarity: "Limited Edition",
      badge: "Supercar",
      features: [
        "V12 Engine",
        "Custom Paint",
        "5-Year Warranty",
        "VIP Delivery",
      ],
      rating: 5,
      isPopular: true,
      collectorGrade: "A+++",
      imageUrl:
        "https://i.pinimg.com/736x/0a/7b/71/0a7b71cc1ac99242473e529606db4599.jpg",
      winnerCount: 1,
      requirements: "Valid driver's license required, Must be 21+ years",
      details: {
        fullDescription:
          "Brand new 2024 Lamborghini Aventador SVJ with full carbon fiber package, custom Grigio Telesto paint, and all factory options included.",
        shippingInfo:
          "Free delivery anywhere in the world including all import duties",
        authentication: "Full manufacturer documentation and ownership papers",
        restrictions: "Must have valid insurance within 30 days of receipt",
        claimProcess:
          "Winner must visit dealership for personalization and delivery",
      },
    },
    {
      id: 3,
      title: "Dubai Marina Penthouse",
      category: "Luxury Real Estate",
      marketValueSAR: "35,000,000 SAR",
      marketValueUSD: "$9,450,000",
      description: "3-Bedroom penthouse with panoramic views of Dubai Marina.",
      entryCost: 100,
      timeRemaining: { days: 7, hours: 12, minutes: 15 },
      totalEntries: 25000,
      userEntries: 0,
      maxEntries: 200,
      convertible: true,
      color: "from-emerald-500 via-teal-600 to-cyan-600",
      rarity: "Exclusive",
      badge: "Property",
      features: [
        "Fully Furnished",
        "2 Parking Spaces",
        "Private Pool",
        "Smart Home",
      ],
      rating: 5,
      isPopular: false,
      collectorGrade: "A++",
      imageUrl:
        "https://i.pinimg.com/736x/c9/4c/44/c94c448ca991dc58a94c459cf1961a12.jpg",
      winnerCount: 1,
      requirements: "Legal adult, Can take cash equivalent option",
      details: {
        fullDescription:
          "Luxury 3-bedroom penthouse in the heart of Dubai Marina, 3200 sqft with panoramic sea views, private terrace with pool, and premium finishes throughout.",
        shippingInfo: "Full legal transfer and registration included",
        authentication: "Property deed and ownership documents",
        restrictions: "Must complete KYC verification",
        claimProcess: "Winner has option to take property or cash equivalent",
      },
    },
    {
      id: 4,
      title: "Private Jet Charter 100 Hours",
      category: "Luxury Travel",
      marketValueSAR: "8,000,000 SAR",
      marketValueUSD: "$2,160,000",
      description:
        "Private jet charter for 100 hours to anywhere in the world.",
      entryCost: 150,
      timeRemaining: { days: 3, hours: 8, minutes: 20 },
      totalEntries: 7800,
      userEntries: 2,
      maxEntries: 100,
      convertible: false,
      color: "from-blue-500 via-blue-600 to-blue-800",
      rarity: "Premium",
      badge: "VIP",
      features: [
        "Global Access",
        "Luxury Catering",
        "Concierge Service",
        "Flexible Scheduling",
      ],
      rating: 5,
      isPopular: true,
      collectorGrade: "A++",
      imageUrl:
        "https://i.pinimg.com/736x/8d/18/1d/8d181d412473426084ffca45bc7644dd.jpg",
      winnerCount: 2,
      requirements: "Travel within 2 years, Max 6 passengers per flight",
      details: {
        fullDescription:
          "100 hours of private jet charter on a Gulfstream G650 or similar aircraft. Includes all landing fees, catering, and ground transportation.",
        shippingInfo: "Digital travel credits delivered via secure portal",
        authentication: "Verified booking platform access",
        restrictions: "Must be used within 24 months",
        claimProcess: "Winner receives access to booking platform with credits",
      },
    },
    {
      id: 5,
      title: "10-Carat Diamond Necklace",
      category: "Luxury Jewelry",
      marketValueSAR: "15,000,000 SAR",
      marketValueUSD: "$4,050,000",
      description: "10-carat D-Flawless diamond necklace from Graff Diamonds.",
      entryCost: 75,
      timeRemaining: { days: 5, hours: 10, minutes: 45 },
      totalEntries: 6800,
      userEntries: 0,
      maxEntries: 150,
      convertible: false,
      color: "from-pink-500 via-rose-600 to-pink-600",
      rarity: "Museum Grade",
      badge: "Diamond",
      features: [
        "GIA Certified",
        "18K White Gold",
        "Insurance Included",
        "Custom Box",
      ],
      rating: 5,
      isPopular: true,
      collectorGrade: "A+++",
      imageUrl:
        "https://i.pinimg.com/736x/7e/33/a8/7e33a899d28b563f75a687be7637567c.jpg",
      winnerCount: 1,
      requirements: "Insurance registration required",
      details: {
        fullDescription:
          "Exquisite 10-carat D color, Flawless clarity diamond set in 18k white gold necklace. Includes full GIA certification and insurance coverage.",
        shippingInfo: "Brinks armored delivery worldwide",
        authentication: "GIA certificate and hologram verification",
        restrictions: "Must maintain insurance for first year",
        claimProcess: "Winner chooses delivery location and time",
      },
    },
    {
      id: 6,
      title: "Bitcoin & Crypto Wealth Package",
      category: "Digital Assets",
      marketValueSAR: "50,000,000 SAR",
      marketValueUSD: "$13,500,000",
      description: "10 Bitcoin + 100 Ethereum + $250,000 in altcoins.",
      entryCost: 50,
      timeRemaining: { days: 14, hours: 0, minutes: 0 },
      totalEntries: 45000,
      userEntries: 4,
      maxEntries: 500,
      convertible: false,
      color: "from-amber-500 via-orange-500 to-yellow-500",
      rarity: "Digital",
      badge: "Crypto",
      features: [
        "Cold Wallet",
        "Security Setup",
        "Trading Mentorship",
        "Tax Advisory",
      ],
      rating: 5,
      isPopular: true,
      collectorGrade: "A+",
      imageUrl:
        "https://i.pinimg.com/736x/9d/0e/6e/9d0e6ed1f67f7dd0e3b6e157885cba72.jpg",
      winnerCount: 10,
      requirements: "Crypto wallet required, KYC verification",
      details: {
        fullDescription:
          "Complete crypto wealth package including 10 Bitcoin, 100 Ethereum, and $250,000 worth of top altcoins. Includes hardware wallet and security setup.",
        shippingInfo: "Digital transfer to verified wallet",
        authentication: "Blockchain transaction verification",
        restrictions: "Must complete KYC/AML verification",
        claimProcess: "Assets transferred to winner's verified wallet",
      },
    },
  ];

  const maxIndex = Math.max(0, prizes.length - itemsPerView);
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };
  const goToSlide = (index) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(interval);
  }, [currentIndex, maxIndex]);

  const visiblePrizes = prizes.slice(currentIndex, currentIndex + itemsPerView);

  const handleClaimPrize = (prize) => {
    if (userPoints < prize.entryCost) {
      alert(
        `You need ${prize.entryCost - userPoints} more points to enter this giveaway. Complete tasks to earn more points!`,
      );
      return;
    }
    setSelectedPrize(prize);
  };

  const handleConfirmEntry = () => {
    if (!selectedPrize) return;

    // Deduct points
    setUserPoints((prev) => prev - selectedPrize.entryCost);

    // Update prize entries
    const updatedPrize = {
      ...selectedPrize,
      userEntries: selectedPrize.userEntries + 1,
      totalEntries: selectedPrize.totalEntries + 1,
    };

    // Find and update in prizes array
    const prizeIndex = prizes.findIndex((p) => p.id === selectedPrize.id);
    prizes[prizeIndex] = updatedPrize;

    alert(
      `Successfully entered ${selectedPrize.title} giveaway! Good luck! ${selectedPrize.entryCost} points deducted.`,
    );
    setSelectedPrize(null);
  };

  const formatTimeRemaining = (time) => {
    if (time.days) {
      return `${time.days}d ${time.hours}h`;
    }
    return `${time.hours}h ${time.minutes}m`;
  };

  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-800/30 to-blue-900/20 rounded-xl p-4 border border-blue-600/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300 text-sm">Total Prize Value</p>
                <p className="text-lg font-bold text-white">122.5M SAR</p>
              </div>
              <FaDollarSign className="text-yellow-400 text-lg" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 rounded-xl p-4 border border-yellow-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-300 text-sm">Active Giveaways</p>
                <p className="text-xl font-bold text-white">{prizes.length}</p>
              </div>
              <FaGift className="text-yellow-400 text-lg" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Carousel Section */}
      <div className="relative mb-12">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-blue-800/80 to-blue-900/80 border border-blue-700/50 flex items-center justify-center text-white hover:text-yellow-400 hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300"
          aria-label="Previous slide"
        >
          <FaChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-blue-800/80 to-blue-900/80 border border-blue-700/50 flex items-center justify-center text-white hover:text-yellow-400 hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300"
          aria-label="Next slide"
        >
          <FaChevronRight className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        {/* Carousel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {visiblePrizes.map((prize) => (
              <motion.div
                key={prize.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="h-full"
              >
                {/* Prize Card - Matching Prizes UI Design */}
                <div className="h-full bg-gradient-to-br from-gray-800/50 to-gray-900/30 border border-gray-700/50 rounded-3xl p-6 backdrop-blur-sm hover:border-yellow-500/40 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-500 overflow-hidden">
                  {/* Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <div className="flex items-center space-x-2">
                      {prize.isPopular && (
                        <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold rounded-full flex items-center">
                          <FaFire className="mr-1" /> Hot
                        </span>
                      )}
                      <span
                        className={`px-3 py-1 bg-gradient-to-br ${prize.color.split(" ").slice(0, 2).join(" ")} text-white text-xs font-bold rounded-full`}
                      >
                        {prize.badge}
                      </span>
                    </div>
                  </div>

                  {/* Rarity Indicator */}
                  <div className="absolute top-4 right-4 z-20">
                    <div className="text-right">
                      <span className="px-2 py-1 bg-gray-900/80 text-gray-300 text-xs font-bold rounded-full border border-gray-700">
                        {prize.rarity}
                      </span>
                      <div className="mt-1 flex justify-end">
                        {[...Array(prize.rating)].map((_, i) => (
                          <FaStar
                            key={i}
                            className="w-3 h-3 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Image Container */}
                  <div className="relative mb-6 mt-10">
                    <div className="relative w-full h-48 rounded-2xl overflow-hidden">
                      <img
                        src={prize.imageUrl}
                        alt={prize.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>

                    {/* Collector Grade */}
                    <div className="absolute -bottom-3 right-4">
                      <div className="px-3 py-1.5 bg-gradient-to-r from-gray-900 to-gray-800 border border-yellow-500/30 rounded-lg shadow-lg">
                        <div className="text-xs text-gray-400">Grade</div>
                        <div className="text-base font-bold text-yellow-400">
                          {prize.collectorGrade}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-6">
                    <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">
                      {prize.category}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 hover:text-yellow-400 transition-colors line-clamp-2">
                      {prize.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                      {prize.description}
                    </p>

                    {/* Market Value Display */}
                    <div className="mb-4 p-3 bg-gray-900/50 rounded-xl border border-gray-700/50">
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-xs text-gray-400">
                          Market Value
                        </div>
                        <FaTag className="text-green-400" />
                      </div>
                      <div className="flex items-baseline justify-between">
                        <div>
                          <div className="text-lg font-bold text-white">
                            {prize.marketValueSAR}
                          </div>
                          <div className="text-xs text-gray-400">SAR</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-green-400">
                            {prize.marketValueUSD}
                          </div>
                          <div className="text-xs text-gray-400">
                            USD Equivalent
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Entry Info */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-blue-900/30 rounded-lg p-2 text-center">
                        <div className="text-xs text-blue-300 mb-1">Cost</div>
                        <div className="text-lg font-bold text-yellow-300">
                          {prize.entryCost} pts
                        </div>
                      </div>
                      <div className="bg-blue-900/30 rounded-lg p-2 text-center">
                        <div className="text-xs text-blue-300 mb-1">
                          Time Left
                        </div>
                        <div className="text-lg font-bold text-white">
                          {formatTimeRemaining(prize.timeRemaining)}
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1.5">
                        {prize.features.slice(0, 3).map((feature, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-800/50 text-gray-300 text-xs rounded-full border border-gray-700"
                          >
                            {feature}
                          </span>
                        ))}
                        {prize.features.length > 3 && (
                          <span className="px-2 py-1 bg-gray-800/50 text-gray-300 text-xs rounded-full border border-gray-700">
                            +{prize.features.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleClaimPrize(prize)}
                    className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center space-x-3 ${
                      userPoints >= prize.entryCost
                        ? "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-blue-900 shadow-lg shadow-yellow-500/30"
                        : "bg-gradient-to-r from-gray-700 to-gray-800 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <FaTicketAlt />
                    <span>
                      {userPoints >= prize.entryCost
                        ? `Enter Giveaway (${prize.entryCost} pts)`
                        : `Need ${prize.entryCost - userPoints} more pts`}
                    </span>
                  </button>

                  {/* Entry Stats */}
                  <div className="mt-3 text-center text-xs text-gray-400">
                    <div className="flex items-center justify-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <FaUsers className="text-blue-400" />
                        <span>
                          {prize.totalEntries.toLocaleString()} entries
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaAward className="text-yellow-400" />
                        <span>{prize.userEntries} yours</span>
                      </div>
                    </div>
                    <div className="mt-1">
                      Win chance:{" "}
                      {(
                        (prize.userEntries / Math.max(prize.totalEntries, 1)) *
                        100
                      ).toFixed(2)}
                      %
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center mt-8 space-x-3">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-gradient-to-r from-yellow-400 to-yellow-600"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <div className="text-center mt-4 text-gray-400 text-sm">
          <span className="text-yellow-400 font-bold">
            {currentIndex + 1} -{" "}
            {Math.min(currentIndex + itemsPerView, prizes.length)}
          </span>{" "}
          of {prizes.length} giveaways
        </div>
      </div>

      {/* Prize Details Modal */}
      <AnimatePresence>
        {selectedPrize && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-2 z-50"
            onClick={() => setSelectedPrize(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-yellow-500/30 rounded-2xl w-full max-w-4xl overflow-hidden max-h-[90vh] overflow-y-auto`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-3 border-b border-yellow-500/20 bg-gradient-to-r from-blue-900/50 to-blue-800/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h2 className="text-xl font-bold">
                        {selectedPrize.title}
                      </h2>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPrize(null)}
                    className="p-2 hover:bg-blue-800/50 rounded-lg transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-2">
                {/* Important Notice */}
                <div className="mb-6 p-2 bg-gradient-to-r from-yellow-600/20 to-yellow-700/20 border-2 border-yellow-500/30 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <FaShieldAlt className="text-yellow-400 text-xl mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-yellow-300 mb-1">
                        Important Notice
                      </h4>
                      <p className="text-blue-100">
                        You can only receive this prize if you are selected as
                        the winner in the random draw.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div>
                    {/* Prize Image */}
                    <div className="mb-6">
                      <div className="relative w-full h-64 rounded-2xl overflow-hidden">
                        <img
                          src={selectedPrize.imageUrl}
                          alt={selectedPrize.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Prize Value */}
                    <div className="mb-2">
                      <h3 className="text-lg font-bold mb-3 flex items-center">
                        <FaDollarSign className="mr-2 text-yellow-400" />
                        Prize Value
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 rounded-xl p-4 border border-blue-700/30 text-center">
                          <div className="text-blue-300 text-sm mb-1">
                            Market Value
                          </div>
                          <div className="text-xl font-bold text-white">
                            {selectedPrize.marketValueSAR}
                          </div>
                          <div className="text-gray-400 text-xs">
                            Saudi Riyal
                          </div>
                        </div>
                        <div className="bg-gradient-to-br from-emerald-900/50 to-emerald-800/30 rounded-xl p-4 border border-emerald-700/30 text-center">
                          <div className="text-emerald-300 text-sm mb-1">
                            USD Equivalent
                          </div>
                          <div className="text-xl font-bold text-white">
                            {selectedPrize.marketValueUSD}
                          </div>
                          <div className="text-gray-400 text-xs">
                            US Dollars
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div>
                    {/* Prize Details */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold mb-3 flex items-center">
                        <FaBoxOpen className="mr-2 text-blue-400" />
                        Prize Details
                      </h3>
                      <p className="text-blue-100 mb-4">
                        {selectedPrize.details.fullDescription}
                      </p>

                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <FaCheckCircle className="text-emerald-400 mt-1 flex-shrink-0" />
                          <div>
                            <span className="font-bold text-blue-300">
                              Shipping:
                            </span>
                            <p className="text-blue-100">
                              {selectedPrize.details.shippingInfo}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <FaShieldAlt className="text-yellow-400 mt-1 flex-shrink-0" />
                          <div>
                            <span className="font-bold text-blue-300">
                              Authentication:
                            </span>
                            <p className="text-blue-100">
                              {selectedPrize.details.authentication}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <FaMedal className="text-purple-400 mt-1 flex-shrink-0" />
                          <div>
                            <span className="font-bold text-blue-300">
                              Claim Process:
                            </span>
                            <p className="text-blue-100">
                              {selectedPrize.details.claimProcess}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="font-bold mb-2 text-blue-300">Features</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedPrize.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 bg-blue-900/40 text-blue-100 text-sm rounded-lg border border-blue-700/50"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mb-2 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="flex-1">
                    {userPoints < selectedPrize.entryCost && (
                      <div className="p-4 bg-gradient-to-r from-amber-900/30 to-amber-800/20 rounded-xl border border-amber-600/30">
                        <div className="flex items-center space-x-3">
                          <FaTicketAlt className="text-amber-400" />
                          <div>
                            <p className="font-bold text-amber-300">
                              Insufficient Points
                            </p>
                            <p className="text-sm text-blue-200">
                              You need {selectedPrize.entryCost - userPoints}{" "}
                              more points to enter. Complete tasks to earn more
                              points!
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => setSelectedPrize(null)}
                      className="px-6 py-3 bg-gradient-to-r from-blue-800 to-blue-900 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirmEntry}
                      disabled={userPoints < selectedPrize.entryCost}
                      className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl font-bold hover:from-yellow-600 hover:to-yellow-700 transition-all flex items-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-yellow-500/30"
                    >
                      <FaTicketAlt />
                      <span>
                        Enter Giveaway ({selectedPrize.entryCost} points)
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-blue-900/50 border-t border-blue-700/30 text-center text-sm text-blue-300">
                <div className="flex items-center justify-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <FaShieldAlt className="text-emerald-400" />
                    <span>100% Secure Entry</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaCheckCircle className="text-yellow-400" />
                    <span>Verified Prizes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaPercentage className="text-blue-400" />
                    <span>Random Selection</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Giveaways;

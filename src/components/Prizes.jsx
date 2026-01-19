import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaStar,
  FaFire,
  FaCrown,
  FaDollarSign,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const prizes = [
  // First 18 items from previous update
  {
    id: 1,
    title: "Omega Speedmaster / Seamaster Watch Vault",
    category: "Luxury Timepieces",
    marketValueSAR: "350,000 SAR",
    marketValueUSD: "$93,500",
    description:
      "Curated collection of Omega's finest Speedmaster & Seamaster professional timepieces with certification.",
    convertible: true,
    color: "from-slate-800 via-gray-700 to-gray-900",
    rarity: "Ultra Exclusive",
    badge: "Swiss Master",
    features: ["Multiple Models", "Full Certification", "Display Cases"],
    rating: 5,
    isPopular: true,
    collectorGrade: "A+++",
    imageUrl:
      "https://i.pinimg.com/1200x/1b/40/cf/1b40cf113206cd1315d9e521d69c8f0c.jpg",
  },
  {
    id: 2,
    title: "Rolex Professional Series Watch Vault",
    category: "Luxury Timepieces",
    marketValueSAR: "1,200,000 SAR",
    marketValueUSD: "$320,000",
    description:
      "Complete Rolex Professional Series collection including Daytona, Submariner, GMT-Master II.",
    convertible: true,
    color: "from-green-600 via-emerald-700 to-green-900",
    rarity: "Museum Grade",
    badge: "Rolex Collection",
    features: [
      "Professional Series Set",
      "Rolex Certification",
      "Investment Grade",
    ],
    rating: 5,
    isNew: true,
    collectorGrade: "A++++",
    imageUrl:
      "https://i.pinimg.com/1200x/1b/28/96/1b28966ac0175731c976cc7c88475e2d.jpg",
  },
  {
    id: 3,
    title: "Cartier / Bulgari High-Jewelry Set",
    category: "Luxury Jewelry",
    marketValueSAR: "2,500,000 SAR",
    marketValueUSD: "$667,000",
    description:
      "Exquisite high-jewelry collection featuring diamonds, emeralds, and rare gemstones from premier maisons.",
    convertible: true,
    color: "from-pink-500 via-rose-600 to-red-600",
    rarity: "Ultra Rare",
    badge: "Haute Joaillerie",
    features: ["GIA Certified", "Designer Pieces", "Secure Vault"],
    rating: 5,
    isPopular: true,
    collectorGrade: "A++++",
    imageUrl:
      "https://i.pinimg.com/1200x/bf/73/d0/bf73d073d82387b50a0befd3fb31d9a8.jpg",
  },
  {
    id: 4,
    title: "Signed Match-Worn Double Jersey Vault",
    category: "Football Memorabilia",
    marketValueSAR: "450,000 SAR",
    marketValueUSD: "$120,000",
    description:
      "Authentic match-worn jerseys from legendary encounters, signed and preserved in museum-quality display.",
    convertible: true,
    color: "from-blue-600 via-indigo-700 to-purple-800",
    rarity: "Legendary Matches",
    badge: "Historic",
    features: ["Multiple Legends", "Match Documentation", "Conservation Grade"],
    rating: 5,
    collectorGrade: "A+++",
    imageUrl:
      "https://i.pinimg.com/736x/aa/17/5b/aa175bab13eb2070bc62df354172f98a.jpg",
  },
  {
    id: 5,
    title: "Cristiano Ronaldo Signed Career Milestone Frame",
    category: "Legend Memorabilia",
    marketValueSAR: "850,000 SAR",
    marketValueUSD: "$227,000",
    description:
      "Chronological display of CR7's career milestones with authenticated signatures from each era.",
    convertible: true,
    color: "from-red-600 via-red-700 to-rose-900",
    rarity: "Career Spanning",
    badge: "CR7 Legacy",
    features: ["Career Timeline", "Multiple Signatures", "Museum Display"],
    rating: 5,
    isNew: true,
    collectorGrade: "A++++",
    imageUrl:
      "https://i.pinimg.com/736x/bb/12/89/bb1289ca8b5e7c55e722afd68020f128.jpg",
  },
  {
    id: 6,
    title: "Apple Ultra Tech Vault",
    category: "Premium Technology",
    marketValueSAR: "180,000 SAR",
    marketValueUSD: "$48,000",
    description:
      "Complete Apple ecosystem with Vision Pro, Mac Studio, and custom professional configurations.",
    convertible: true,
    color: "from-gray-700 via-gray-800 to-black",
    rarity: "Pro Configuration",
    badge: "Apple Ultimate",
    features: ["Full Ecosystem", "Pro Configurations", "Setup Service"],
    rating: 4,
    collectorGrade: "A++",
    imageUrl:
      "https://i.pinimg.com/736x/5a/ad/ef/5aadef3416eb79570a34a3d2bef49b04.jpg",
  },
  {
    id: 7,
    title: "Five-Star Hospitality Credit Vault",
    category: "Luxury Lifestyle",
    marketValueSAR: "1,000,000 SAR",
    marketValueUSD: "$267,000",
    description:
      "Unlimited five-star hospitality credits for global luxury hotels, resorts, and fine dining.",
    convertible: true,
    color: "from-amber-500 via-orange-600 to-red-600",
    rarity: "Unlimited Access",
    badge: "Global Luxury",
    features: ["Global Network", "Unlimited Credits", "Concierge Service"],
    rating: 5,
    collectorGrade: "A++++",
    imageUrl:
      "https://i.pinimg.com/1200x/1f/60/48/1f60480f9dcfea15cf73c399766c89ac.jpg",
  },
  {
    id: 8,
    title: "Luxury Fashion Trunk (Louis Vuitton / Dior / Hermès)",
    category: "Haute Couture",
    marketValueSAR: "680,000 SAR",
    marketValueUSD: "$181,000",
    description:
      "Curated collection of luxury fashion pieces from premier maisons with personal styling service.",
    convertible: true,
    color: "from-brown-600 via-amber-800 to-yellow-900",
    rarity: "Designer Collection",
    badge: "Haute Couture",
    features: ["Multiple Designers", "Personal Styling", "Seasonal Updates"],
    rating: 5,
    isNew: true,
    collectorGrade: "A+++",
    imageUrl:
      "https://i.pinimg.com/736x/f8/77/4d/f8774dbd5b2ddda1f5f9b70bb475920c.jpg",
  },
  {
    id: 9,
    title: "2026 Cadillac Escalade-V Super-SUV Vault",
    category: "Ultra-Luxury Performance SUV",
    marketValueSAR: "650,000 SAR",
    marketValueUSD: "$173,500",
    description:
      "The most powerful Cadillac ever built, featuring a supercharged 6.2L V-8 with 682 horsepower, a 55-inch curved OLED display, and Super Cruise hands-free driving technology[citation:2].",
    convertible: false,
    color: "from-gray-900 via-slate-800 to-slate-950",
    rarity: "Super Flagship",
    badge: "Super-SUV",
    features: [
      "682 HP Supercharged V8",
      "AKG 42-Speaker Studio Audio",
      "Semi-Aniline Leather Throughout[citation:2]",
    ],
    rating: 5,
    isNew: true,
    collectorGrade: "A++",
    imageUrl:
      "https://i.pinimg.com/1200x/31/04/03/3104034cdc1820e6c58cdb44fd762b0e.jpg",
  },
  {
    id: 10,
    title: "BMW M3 Competition xDrive Sedan Performance Vault",
    category: "German High-Performance Sedan",
    marketValueSAR: "400,000 SAR",
    marketValueUSD: "$106,580",
    description:
      "A 2025 Grand Prize M3 featuring the Competition package and xDrive all-wheel drive for ultimate performance and precision, finished in exclusive Individual Ruby Star Neo paint[citation:7].",
    convertible: false,
    color: "from-rose-800 via-red-700 to-ruby-900",
    rarity: "Sports Sedan Elite",
    badge: "///M Power",
    features: [
      "M Carbon Bucket Seats",
      "Executive & Driving Assistance Packages",
      "Carbon Fiber Trim[citation:7]",
    ],
    rating: 5,
    isPopular: true,
    collectorGrade: "A+++",
    imageUrl:
      "https://i.pinimg.com/736x/f6/fc/e7/f6fce7399b56980e8ad4810d35a0d8ab.jpg",
  },
  {
    id: 11,
    title: "1300HP Twin-Turbo 1969 Camaro Restomod Vault",
    category: "American Icon Restomod",
    marketValueSAR: "1,125,000 SAR",
    marketValueUSD: "$300,000",
    description:
      "A no-expense-spared, purpose-built icon. This '69 Camaro is engineered to modern supercar standards with a race-built twin-turbo LSX V8 producing an estimated 1,300 horsepower[citation:10].",
    convertible: false,
    color: "from-gray-700 via-gray-600 to-slate-500",
    rarity: "SEMA Masterpiece",
    badge: "Restomod Legend",
    features: [
      "Forged 1,300 HP LME LSX Engine",
      "Complete Detroit Speed Chassis",
      "Custom PPG Destroyer Gray Finish[citation:10]",
    ],
    rating: 5,
    isNew: true,
    collectorGrade: "A++++",
    imageUrl:
      "https://i.pinimg.com/736x/1c/16/46/1c1646ddc0a64f8cf0be0f69805a0fa6.jpg",
  },
];

const Prizes = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const totalItems = prizes.length;

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

  const maxIndex = Math.max(0, totalItems - itemsPerView);

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
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, maxIndex]);

  const visiblePrizes = prizes.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <section
      id="prizes"
      className="relative py-10 bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-yellow-500 rounded-full mix-blend-overlay filter blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-overlay filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-full px-6 py-2 mb-6">
            <FaCrown className="text-yellow-400" />
            <span className="text-yellow-400 font-semibold">
              Premium Collection
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Exclusive{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              High-Value Prizes
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Browse through our exclusive collection. Each prize is authenticated
            and comes with a certificate of authenticity.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2"
            >
              {visiblePrizes.map((prize) => (
                <motion.div
                  key={prize.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="h-full"
                >
                  {/* Prize Card */}
                  <div className="h-full bg-gradient-to-br from-gray-800/50 to-gray-900/30 border border-gray-700/50 rounded-3xl p-6 backdrop-blur-sm hover:border-yellow-500/40 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-500 overflow-hidden hover:scale-[1.02]">
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
                          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
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
                      <div className="mb-3 p-3 bg-gray-900/50 rounded-xl border border-gray-700/50">
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-xs text-gray-400">
                            Market Value
                          </div>
                          <FaDollarSign className="text-green-400" />
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
                            <div className="text-xs text-gray-400">USD</div>
                          </div>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1.5">
                          {prize.features.map((feature, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-gray-800/50 text-gray-300 text-xs rounded-full border border-gray-700"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Prizes;

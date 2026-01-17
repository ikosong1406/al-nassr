import React from "react";
import { motion } from "framer-motion";
import {
  FaCheck,
  FaStar,
  FaFire,
  FaGift,
  FaCrown,
  FaDollarSign,
} from "react-icons/fa";

const prizes = [
  {
    id: 1,
    title: "Cristiano Ronaldo Match-Worn Jersey",
    category: "Match Memorabilia",
    marketValueSAR: "120,000 SAR",
    marketValueUSD: "$32,400",
    description:
      "Official home jersey worn by CR7 during 2023 Champions League match.",
    convertible: true,
    color: "from-yellow-400 via-yellow-500 to-amber-600",
    rarity: "Ultra Rare",
    badge: "Iconic",
    features: ["Match Authenticated", "Player Signed", "Framing Included"],
    rating: 5,
    isPopular: true,
    collectorGrade: "A++",
    imageUrl:
      "https://i.pinimg.com/736x/ca/87/10/ca8710a8ba6bdf46d662a1f4d20a0a36.jpg",
  },
  {
    id: 2,
    title: "Al-Nassr 2024 Elite Kit Collection",
    category: "Team Merchandise",
    marketValueSAR: "30,000 SAR",
    marketValueUSD: "$8,100",
    description: "Complete elite kit set for entire 2024 squad.",
    convertible: true,
    color: "from-blue-500 via-blue-600 to-blue-800",
    rarity: "Limited Edition",
    badge: "Complete Set",
    features: ["Full Squad Set", "Official Match Spec", "Limited to 50"],
    rating: 4,
    isNew: true,
    collectorGrade: "A+",
    imageUrl:
      "https://i.pinimg.com/1200x/3a/45/35/3a45357b4782c114fb8e0180a8cdd130.jpg",
  },
  {
    id: 3,
    title: "CR7 Match-Worn Superfly Boots",
    category: "Player Equipment",
    marketValueSAR: "60,000 SAR",
    marketValueUSD: "$16,200",
    description: "Nike Mercurial boots worn by Ronaldo during record match.",
    convertible: true,
    color: "from-purple-500 via-purple-600 to-pink-600",
    rarity: "Extremely Rare",
    badge: "Match Used",
    features: ["Match Worn", "Player Signed", "Box Included"],
    rating: 5,
    isPopular: true,
    collectorGrade: "A++",
    imageUrl:
      "https://i.pinimg.com/736x/82/15/27/82152703ac94c194b964a4bd47c25a88.jpg",
  },
  {
    id: 4,
    title: "Signed Golden Ball Trophy Replica",
    category: "Awards & Trophies",
    marketValueSAR: "95,000 SAR",
    marketValueUSD: "$25,650",
    description: "24K gold-plated Ballon d'Or replica signed by 5 legends.",
    convertible: true,
    color: "from-amber-400 via-yellow-500 to-yellow-600",
    rarity: "Museum Grade",
    badge: "Golden",
    features: ["24K Gold Plated", "5 Signatures", "Display Case"],
    rating: 5,
    collectorGrade: "A+++",
    imageUrl:
      "https://i.pinimg.com/736x/7e/33/a8/7e33a899d28b563f75a687be7637567c.jpg",
  },
  {
    id: 5,
    title: "VIP Season Executive Box",
    category: "Experience",
    marketValueSAR: "200,000 SAR",
    marketValueUSD: "$54,000",
    description: "Executive box for 10 people for entire season.",
    convertible: true,
    color: "from-emerald-500 via-teal-600 to-cyan-600",
    rarity: "Exclusive",
    badge: "VIP",
    features: ["10 Seats", "Full Catering", "Parking Pass"],
    rating: 5,
    isPopular: true,
    collectorGrade: "A++",
    imageUrl:
      "https://i.pinimg.com/736x/c9/4c/44/c94c448ca991dc58a94c459cf1961a12.jpg",
  },
  {
    id: 6,
    title: "Al-Nassr Legends Signed Ball",
    category: "Collectibles",
    marketValueSAR: "20,000 SAR",
    marketValueUSD: "$5,400",
    description: "Official match ball signed by entire championship squad.",
    convertible: true,
    color: "from-red-500 via-rose-600 to-pink-600",
    rarity: "Limited",
    badge: "Squad Signed",
    features: ["Full Squad", "Match Ball", "Display Stand"],
    rating: 4,
    isNew: true,
    collectorGrade: "A",
    imageUrl:
      "https://i.pinimg.com/736x/9d/0e/6e/9d0e6ed1f67f7dd0e3b6e157885cba72.jpg",
  },
  {
    id: 7,
    title: "Cristiano's Training Gear Set",
    category: "Player Equipment",
    marketValueSAR: "75,000 SAR",
    marketValueUSD: "$20,250",
    description: "Complete training kit used by Ronaldo during preseason.",
    convertible: true,
    color: "from-orange-500 via-amber-500 to-yellow-500",
    rarity: "Rare",
    badge: "Training",
    features: ["Full Set", "Match Used", "Certificate"],
    rating: 4,
    collectorGrade: "A+",
    imageUrl:
      "https://i.pinimg.com/736x/d4/ad/17/d4ad17b024a790a18ad9fe832d86ca1c.jpg",
  },
  {
    id: 8,
    title: "Match-Worn Captain's Armband",
    category: "Match Memorabilia",
    marketValueSAR: "45,000 SAR",
    marketValueUSD: "$12,150",
    description: "Official captain's armband worn during derby match.",
    convertible: true,
    color: "from-indigo-500 via-purple-600 to-pink-600",
    rarity: "Limited",
    badge: "Captain",
    features: ["Match Used", "Authenticated", "Framed"],
    rating: 4,
    collectorGrade: "A+",
    imageUrl:
      "https://i.pinimg.com/736x/6d/b0/bb/6db0bbb53587d635a52b566a0a5e0ce3.jpg",
  },
];

const Prizes = () => {
  // Duplicate prizes for seamless marquee effect
  const marqueePrizes = [...prizes, ...prizes, ...prizes];

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
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Scroll through our premium collection. All items are verified
            collectibles with instant cash conversion.
          </p>
        </motion.div>

        {/* Marquee Container */}
        <div className="relative">
          {/* Gradient Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 z-10"></div>

          {/* Marquee */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6 py-4"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                ease: "linear",
                duration: 60,
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              {marqueePrizes.map((prize, index) => (
                <div
                  key={`${prize.id}-${index}`}
                  className="flex-shrink-0 w-90 md:w-96 group cursor-grab active:cursor-grabbing"
                >
                  {/* Prize Card */}
                  <div className="h-full bg-gradient-to-br from-gray-800/50 to-gray-900/30 border border-gray-700/50 rounded-3xl p-6 backdrop-blur-sm hover:border-yellow-500/40 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-500 overflow-hidden group-hover:scale-[1.02]">
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
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors line-clamp-2">
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
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Prizes;

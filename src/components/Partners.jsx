import React from "react";
import { motion } from "framer-motion";

const PartnersCarousel = () => {
  // Partner data - includes confirmed and illustrative partners
  const partners = [
    {
      id: 1,
      name: "Public Investment Fund (PIF)",
      logoUrl:
        "https://i.pinimg.com/736x/42/1e/d3/421ed3368e875fe0817c6539c5e9835e.jpg",
      description: "Majority owner of the club (75%)[citation:10]",
      isSaudiGov: true,
    },
    {
      id: 2,
      name: "King Abdullah Financial District (KAFD)",
      logoUrl:
        "https://i.pinimg.com/736x/d7/52/a4/d752a4d52b6325dc6b184a27616970c8.jpg",
      description: "Platinum sponsor for the next three seasons[citation:7]",
    },
    {
      id: 3,
      name: "adidas",
      logoUrl:
        "https://i.pinimg.com/736x/85/e8/ac/85e8ac7e34fc40846fedd80dee7bec86.jpg",
      description:
        "One of the top technical sponsors in global football[citation:9]",
    },
    {
      id: 4,
      name: "Nike",
      logoUrl:
        "https://i.pinimg.com/1200x/1f/b4/7e/1fb47eae62439eb56c30e9673830d957.jpg",
      description: "Top-tier sportswear and technical sponsor[citation:9]",
    },
    {
      id: 5,
      name: "Emirates",
      logoUrl:
        "https://i.pinimg.com/736x/0e/d5/06/0ed5069a3290f09c5bff3aa87cb8b226.jpg",
      description:
        "Major global airline and frequent football sponsor[citation:8]",
    },
    {
      id: 7,
      name: "SAUDIA",
      logoUrl:
        "https://i.pinimg.com/1200x/94/a4/30/94a43065ecc523c01981e6a58e70bd93.jpg",
      description: "Saudi national airline and travel partner",
    },
    {
      id: 8,
      name: "BMW",
      logoUrl:
        "https://i.pinimg.com/736x/87/90/a9/8790a9d7b2fd3ece0edb2cd6d16b5aa1.jpg",
      description:
        "Premium automotive brand and high-profile sponsor[citation:8]",
    },
  ];

  // Duplicate array for seamless infinite scroll
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-6 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Infinite Marquee Container */}
        <div className="relative">
          {/* Gradient Fades for edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10"></div>

          {/* Marquee Track */}
          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-12"
              animate={{
                x: [0, -1000], // Adjust -1000px based on total width of one set of logos
              }}
              transition={{
                ease: "linear",
                duration: 20,
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              {duplicatedPartners.map((partner) => (
                <div
                  key={`${partner.id}-${Math.random()}`}
                  className="flex flex-col items-center justify-center w-40 flex-shrink-0 group"
                >
                  {/* Logo Container */}
                  <div className="w-32 h-32 bg-white/5 border border-gray-700/50 rounded-2xl p-4 flex items-center justify-center group-hover:border-yellow-500/50 group-hover:bg-white/10 transition-all duration-300">
                    {/* Uncomment below when you have actual logo images */}
                    <img
                      src={partner.logoUrl}
                      alt={`${partner.name} logo`}
                      className="max-w-full max-h-full object-contain"
                    />
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

export default PartnersCarousel;

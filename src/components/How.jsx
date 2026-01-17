import React from "react";
import { motion } from "framer-motion";
import {
  FaUserPlus,
  FaGift,
  FaMoneyBillWave,
  FaCreditCard,
  FaChevronRight,
  FaCheckCircle,
} from "react-icons/fa";

const howItWorksSteps = [
  {
    number: "01",
    title: "Sign Up & Log In",
    description:
      "Create your free account in under 2 minutes. No fees required.",
    icon: <FaUserPlus className="text-xl" />,
    color: "from-blue-500 to-cyan-400",
  },
  {
    number: "02",
    title: "Win Prizes",
    description: "Get selected for amazing team rewards and memorabilia.",
    icon: <FaGift className="text-xl" />,
    color: "from-yellow-500 to-amber-400",
  },
  {
    number: "03",
    title: "Convert to Cash",
    description: "Convert any prize instantly to Saudi Riyal with one click.",
    icon: <FaMoneyBillWave className="text-xl" />,
    color: "from-orange-500 to-red-400",
  },
  {
    number: "04",
    title: "Withdraw",
    description: "Receive funds directly to your bank or digital wallet.",
    icon: <FaCreditCard className="text-xl" />,
    color: "from-purple-500 to-pink-400",
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="relative py-20 bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(253,224,71,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      </div>

      {/* Top Cut (Matches Hero's bottom cut) */}
      <div
        className="absolute top-0 left-0 right-0 h-16 lg:h-24 -mt-1"
        style={{
          background:
            "linear-gradient(to bottom, #0c1b33 0%, transparent 100%)",
          clipPath: "polygon(0% 0%, 100% 100%, 100% 0%, 0% 0%)",
        }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full px-6 py-2 mb-6">
            <span className="text-yellow-400 font-semibold">
              Simple Process
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            How It{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
        </motion.div>

        {/* Steps Container */}
        <div className="relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500/10 via-yellow-500/20 to-yellow-500/10 transform -translate-y-1/2"></div>
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-500/30 via-yellow-500/50 to-yellow-500/30 transform -translate-y-1/2"></div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {howItWorksSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Step Card */}
                <div className="relative h-full bg-gradient-to-b from-blue-900/40 to-blue-800/20 border border-blue-700/30 rounded-2xl p-8 hover:border-yellow-500/40 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300 backdrop-blur-sm">
                  {/* Step Number Badge */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                    >
                      <span className="text-white font-bold text-lg">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-yellow-400 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Step Indicator for Mobile */}
                  {index < howItWorksSteps.length - 1 && (
                    <>
                      <div className="lg:hidden absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-yellow-300/30 to-transparent"></div>
                      <div className="lg:hidden absolute -bottom-4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <FaChevronRight className="text-yellow-300/50 rotate-90" />
                      </div>
                    </>
                  )}

                  {/* Step Indicator for Desktop */}
                  {index < howItWorksSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform translate-y-1/2">
                      <div className="w-8 h-8 rounded-full bg-blue-900 border border-yellow-500/30 flex items-center justify-center">
                        <FaChevronRight className="text-yellow-300" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Connecting Line Dots */}
                {index < howItWorksSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 transform translate-y-1/2 translate-x-1/2">
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 rounded-full bg-yellow-300/50"></div>
                      <div className="w-1 h-1 rounded-full bg-yellow-300/50"></div>
                      <div className="w-1 h-1 rounded-full bg-yellow-300/50"></div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-950 to-transparent"></div>
    </section>
  );
};

export default HowItWorks;

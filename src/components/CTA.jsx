import React from "react";
import { motion } from "framer-motion";
import { FaTrophy, FaArrowRight } from "react-icons/fa";

const CTA = ({ countdown }) => {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(253,224,71,0.1),transparent_70%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full px-6 py-3 mb-8"
          >
            <FaTrophy className="text-yellow-400" />
            <span className="text-yellow-400 font-semibold">
              20,000,000 SAR Jackpot
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Support Your Team.
            <span className="block bg-yellow-400 bg-clip-text text-transparent">
              Win Big. Cash Out Instantly.
            </span>
          </h2>

          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of Al-Nassr fans in our official giveaway. Every
            entry supports the team and gives you a chance to win amazing prizes
            or cash rewards.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-10 py-5 bg-yellow-400 text-blue-900 rounded-xl font-bold text-xl transition-all shadow-2xl shadow-yellow-500/30"
            >
              <a
                className="flex items-center justify-center gap-3"
                href="/signup"
              >
                Enter Giveaway Now
                <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
              </a>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;

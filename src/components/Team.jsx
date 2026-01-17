import React from "react";
import { motion } from "framer-motion";

import presidentImage from "../assets/president.png";
import coachImage from "../assets/coach.png";

const leadershipStatements = [
  {
    name: "Luís Castro",
    title: "Head Coach, Al-Nassr FC",
    statement:
      "The energy from our fans is what drives this team forward every single matchday. This initiative connects our performance on the pitch directly with our supporters, creating a powerful bond that makes us stronger together.",
    image: coachImage,
    backgroundColor: "from-yellow-500/10 to-amber-500/10",
    accentColor: "border-yellow-500",
    alignment: "left",
  },
  {
    name: "Musalli Al-Muammar",
    title: "President, Al-Nassr FC",
    statement:
      "This official platform represents our commitment to engaging with the most passionate fanbase in world football. Through these initiatives, we're not just giving back to our supporters - we're building a stronger community that stands united behind our team.",
    image: presidentImage,
    backgroundColor: "from-blue-900/30 to-blue-800/30",
    accentColor: "border-blue-500",
    alignment: "right",
  },
];

const TeamIdentity = () => {
  return (
    <section
      id="team"
      className="relative py-10 bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-overlay filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-600 rounded-full mix-blend-overlay filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-full px-6 py-2 mb-6">
            <span className="text-yellow-400 font-semibold">
              Official Statements
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Direct from{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Leadership
            </span>
          </h2>
        </motion.div>

        <div className="space-y-16 md:space-y-24 mb-20">
          {leadershipStatements.map((leader, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative ${leader.alignment === "right" ? "md:pr-[40%]" : "md:pl-[40%]"}`}
            >
              {/* Single Container with Picture Overlap */}
              <div
                className={`relative bg-gradient-to-br ${leader.backgroundColor} border ${leader.accentColor}/30 rounded-3xl p-8 md:p-10 backdrop-blur-sm hover:border-${leader.accentColor}/50 hover:shadow-2xl hover:shadow-${leader.accentColor}/10 transition-all duration-500 min-h-[350px] md:min-h-[400px] flex items-center ${leader.alignment === "right" ? "justify-start" : "justify-end"}`}
              >
                {/* Statement Content */}
                <div
                  className={`relative z-20 max-w-2xl ${leader.alignment === "right" ? "text-left pr-8" : "text-left md:text-right pl-8 md:pl-0"}`}
                >
                  <div className="mb-8">
                    <div className="text-sm text-yellow-400 font-semibold uppercase tracking-wider mb-3">
                      Official Statement
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {leader.name}
                    </h3>
                    <p className="text-blue-300 font-medium text-lg">
                      {leader.title}
                    </p>
                  </div>

                  <div className="relative">
                    <div
                      className={`absolute ${leader.alignment === "right" ? "-left-6" : "md:-right-6 -left-6"} -top-6 text-5xl md:text-6xl text-yellow-500/20 font-serif`}
                    >
                      "
                    </div>
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed italic">
                      {leader.statement}
                    </p>
                    <div
                      className={`absolute ${leader.alignment === "right" ? "-right-4" : "md:-left-4 -right-4"} -bottom-6 text-5xl md:text-6xl text-yellow-500/20 font-serif`}
                    >
                      "
                    </div>
                  </div>

                  <div className="mt-10 pt-6 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-px bg-gradient-to-r from-yellow-500 to-transparent"></div>
                        <span className="text-sm text-gray-400">
                          Official Endorsement
                        </span>
                        <div className="w-12 h-px bg-gradient-to-r from-transparent to-yellow-500"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Picture Overlay - Positioned Absolutely */}
                <div
                  className={`absolute bottom-0 ${leader.alignment === "right" ? "right-0" : "left-0"} w-full md:w-[45%] h-3/4 md:h-full`}
                >
                  <div className="relative w-full h-full">
                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${leader.alignment === "right" ? "from-blue-900/60 via-blue-900/40 to-transparent" : "from-blue-900/40 via-blue-900/20 to-transparent"} z-10`}
                    ></div>

                    {/* Image Container - Aligns Bottom with Div */}
                    <div className="absolute bottom-0 w-full h-[400px] overflow-hidden">
                      <img
                        src={leader.image}
                        alt={leader.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamIdentity;

import React from "react";
import { FaFutbol, FaLock } from "react-icons/fa";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-blue-950 border-t border-yellow-500/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center">
                <img src={logo} alt="Al-Nassr Logo" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-yellow-400 bg-clip-text text-transparent">
                  Al-Nassr
                </h2>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              The official giveaway platform of Al-Nassr Football Club. Support
              your team, win amazing prizes, and convert any reward to cash
              instantly.
            </p>
          </div>

          {/* Links Columns */}
          {[
            {
              title: "Platform",
              links: ["How It Works", "Prizes", "Cash Conversion", "Winners"],
            },
            {
              title: "Support",
              links: ["FAQ", "Contact", "Terms", "Privacy"],
            },
          ].map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4 text-white">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-yellow-400 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-center md:text-left mb-4 md:mb-0">
              <p>© {new Date().getFullYear()} Al-Nassr. All rights reserved.</p>
            </div>
            <div className="flex items-center space-x-2">
              <FaLock className="text-yellow-400" />
              <span className="text-gray-400 text-sm">Secure & Encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

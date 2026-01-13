// src/App.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaChartLine,
  FaUserPlus,
  FaSignInAlt,
  FaArrowUp,
  FaArrowDown,
  FaRobot,
  FaRocket,
  FaChartBar,
  FaShieldAlt,
  FaBolt,
  FaBrain,
  FaCogs,
  FaMobileAlt,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaDiscord,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowRight,
  FaCheck,
  FaClock,
  FaLock,
  FaGlobe,
  FaUsers,
  FaDollarSign,
  FaCog,
  FaChartPie,
  FaHandshake,
  FaQuestionCircle,
  FaPlay,
} from "react-icons/fa";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Security", href: "#security" },
    { name: "FAQ", href: "#faq" },
  ];

  const forexPairs = [
    {
      pair: "EUR/USD",
      price: "1.0954",
      change: "+0.0023",
      changePercent: "+0.21%",
    },
    {
      pair: "GBP/USD",
      price: "1.2748",
      change: "-0.0012",
      changePercent: "-0.09%",
    },
    {
      pair: "USD/JPY",
      price: "147.32",
      change: "+0.45",
      changePercent: "+0.31%",
    },
    {
      pair: "AUD/USD",
      price: "0.6579",
      change: "+0.0018",
      changePercent: "+0.27%",
    },
    {
      pair: "USD/CAD",
      price: "1.3542",
      change: "-0.0021",
      changePercent: "-0.15%",
    },
    {
      pair: "NZD/USD",
      price: "0.6134",
      change: "+0.0012",
      changePercent: "+0.20%",
    },
    {
      pair: "EUR/GBP",
      price: "0.8592",
      change: "-0.0008",
      changePercent: "-0.09%",
    },
    {
      pair: "USD/CHF",
      price: "0.8835",
      change: "+0.0015",
      changePercent: "+0.17%",
    },
  ];

  const stats = [
    { value: "24/7", label: "Market Monitoring", icon: <FaRobot /> },
    { value: "99.8%", label: "Accuracy Rate", icon: <FaChartBar /> },
    { value: "2.5M+", label: "Trades Analyzed", icon: <FaShieldAlt /> },
  ];

  const features = [
    {
      icon: <FaBrain />,
      title: "AI-Powered Analysis",
      description:
        "Advanced neural networks analyze market patterns and predict trends with 99.8% accuracy.",
    },
    {
      icon: <FaBolt />,
      title: "Lightning Execution",
      description:
        "Execute trades in milliseconds before market shifts. Never miss a profitable opportunity.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Risk Management",
      description:
        "Smart stop-loss and take-profit algorithms protect your capital from market volatility.",
    },
    {
      icon: <FaChartLine />,
      title: "Real-Time Analytics",
      description:
        "Comprehensive dashboard with live market data, performance metrics, and trade history.",
    },
    {
      icon: <FaMobileAlt />,
      title: "Mobile Control",
      description:
        "Monitor and control your trading bot from anywhere with our mobile app.",
    },
    {
      icon: <FaCogs />,
      title: "Custom Strategies",
      description:
        "Build and backtest your own trading strategies or use our proven templates.",
    },
  ];

  const howItWorksSteps = [
    {
      number: "01",
      title: "Sign Up & Connect",
      description:
        "Create your account and connect your trading platform via secure API.",
    },
    {
      number: "02",
      title: "Configure Strategy",
      description: "Choose from pre-built AI strategies",
    },
    {
      number: "03",
      title: "Activate AI",
      description:
        "Start the bot and let AI handle trading 24/7 automatically.",
    },
  ];

  const testimonials = [
    {
      name: "Alex Thompson",
      role: "Forex Trader",
      text: "My portfolio grew by 45% in 3 months. The AI consistently outperforms manual trading.",
      rating: 5,
    },
    {
      name: "Sarah Chen",
      role: "Financial Analyst",
      text: "Risk management features are exceptional. I sleep better knowing my investments are protected.",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "Hedge Fund Manager",
      text: "Enterprise features helped scale our trading operations with precision and reliability.",
      rating: 5,
    },
  ];

  const securityFeatures = [
    {
      icon: <FaLock />,
      title: "Bank-Level Encryption",
      description:
        "256-bit SSL encryption for all data transmission and storage.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Two-Factor Authentication",
      description: "Extra layer of security with 2FA for all account access.",
    },
    {
      icon: <FaGlobe />,
      title: "Regulatory Compliance",
      description:
        "Fully compliant with financial regulations and data protection laws.",
    },
    {
      icon: <FaClock />,
      title: "24/7 Monitoring",
      description:
        "Continuous security monitoring and threat detection systems.",
    },
  ];

  const faqItems = [
    {
      question: "Do I need trading experience to use the bot?",
      answer:
        "No, our AI is designed for both beginners and experienced traders. The bot handles all complex analysis automatically.",
    },
    {
      question: "Is my money safe with the trading bot?",
      answer:
        "Yes. We use read-only API keys, meaning the bot can only analyze and suggest trades. You maintain full control over execution.",
    },
    {
      question: "Can I customize the trading strategies?",
      answer:
        "Absolutely. You can modify parameters, create custom strategies, or use our proven AI templates.",
    },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-teal-500/20"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
                  Stratix
                </h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="text-gray-300 hover:text-teal-400 transition-colors duration-300"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 text-teal-400 border border-teal-400 rounded-lg hover:bg-teal-400/10 transition-colors"
              >
                <a href="/login" className="flex items-center space-x-2">
                  <FaSignInAlt />
                  <span>Sign In</span>
                </a>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all"
              >
                <a href="/signup" className="flex items-center space-x-2">
                  <FaUserPlus />
                  <span>Get Started</span>
                </a>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-300 hover:text-teal-400"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4"
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className="text-gray-300 hover:text-teal-400 py-2 border-b border-gray-800"
                  >
                    {item.name}
                  </a>
                ))}
                <div className="flex flex-col space-y-3 pt-4">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center space-x-2 py-3 text-teal-400 border border-teal-400 rounded-lg"
                  >
                    <a href="/login" className="flex items-center space-x-2">
                      <FaSignInAlt />
                      <span>Sign In</span>
                    </a>
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg"
                  >
                    <a href="/signup" className="flex items-center space-x-2">
                      <FaUserPlus />
                      <span>Get Started</span>
                    </a>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.header>

      {/* Trading Ticker */}
      <div className="bg-black/90 overflow-hidden">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center">
            <div className="hidden md:flex items-center space-x-2 mr-6">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-teal-400">
                LIVE MARKET
              </span>
            </div>

            <div className="flex-1 overflow-hidden">
              <motion.div
                animate={{ x: [0, -1000] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 40,
                    ease: "linear",
                  },
                }}
                className="flex space-x-8"
              >
                {[...forexPairs, ...forexPairs].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-6 whitespace-nowrap"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-300">
                        {item.pair}
                      </span>
                      <span className="font-bold text-white">{item.price}</span>
                      <div
                        className={`flex items-center ${
                          item.change.startsWith("+")
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {item.change.startsWith("+") ? (
                          <FaArrowUp size={12} />
                        ) : (
                          <FaArrowDown size={12} />
                        )}
                        <span className="ml-1 text-sm">
                          {item.change} ({item.changePercent})
                        </span>
                      </div>
                    </div>
                    <div className="w-px h-4 bg-gray-700"></div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070")',
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-teal-500/10 to-black"></div>
        </div>

        <div className="container mx-auto px-4 py-10 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center space-x-2 bg-teal-500/10 border border-teal-500/30 rounded-full px-4 py-2 mb-8"
            >
              <FaRocket className="text-teal-400" />
              <p className="text-teal-400 font-medium">
                AI-Powered Trading Revolution
              </p>
            </motion.div>

            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Trade Smarter with{" "}
              <span className="bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
                AI Precision
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Our advanced AI trading bot analyzes millions of data points to
              execute profitable forex trades 24/7. Maximize your returns while
              minimizing risk.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-semibold text-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg shadow-teal-500/20"
              >
                <a href="/login" className="flex justify-center space-x-2">
                  Start Trading
                </a>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-teal-500 text-teal-400 rounded-xl font-semibold text-lg hover:bg-teal-500/10 transition-all"
              >
                <a href="/signup" className="flex justify-center space-x-2">
                  <span className="flex items-center justify-center gap-2">
                    Create Account
                  </span>
                </a>
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-teal-500/50 transition-all"
                >
                  <div className="text-2xl text-teal-400 mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-2">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              How It <span className="text-teal-400">Works</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Get started with AI trading in just 4 simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {howItWorksSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-black/50 border border-gray-800 rounded-xl p-8 hover:border-teal-500/50 transition-all h-full">
                  <div className="text-3xl font-bold text-teal-400/30 mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
                {index < howItWorksSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 right-0 transform translate-x-1/2 w-12 h-0.5 bg-teal-500/30"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Powerful <span className="text-teal-400">Features</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Everything you need for successful automated forex trading in one
              platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900 border border-gray-800 rounded-xl p-8 hover:border-teal-500/50 transition-all group"
              >
                <div className="text-2xl text-teal-400 mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-20 ">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Enterprise-Grade <span className="text-teal-400">Security</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Your funds and data are protected with military-grade security
              measures
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-teal-500/10 border border-teal-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="text-2xl text-teal-400">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Trusted by <span className="text-teal-400">Traders</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Join thousands of successful traders who trust our AI trading
              platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900 border border-gray-800 rounded-xl p-8"
              >
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaChartLine key={i} className="text-teal-400 mr-1" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-teal-500/20 rounded-full flex items-center justify-center mr-4">
                    <FaUsers className="text-teal-400" />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Frequently Asked <span className="text-teal-400">Questions</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Find answers to common questions about our AI trading platform
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-teal-500/50 transition-all"
              >
                <div className="flex items-start">
                  <FaQuestionCircle className="text-teal-400 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold mb-3">{item.question}</h3>
                    <p className="text-gray-400">{item.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-black to-purple-500/10"></div>

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
              className="inline-flex items-center space-x-2 bg-teal-500/20 border border-teal-500/30 rounded-full px-6 py-3 mb-8"
            >
              <FaRocket className="text-teal-400" />
              <span className="text-teal-400 font-semibold">
                Ready to Launch
              </span>
            </motion.div>

            <h2 className="text-2xl md:text-4xl font-bold mb-6">
              Start Your{" "}
              <span className="bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
                Automated Trading
              </span>{" "}
              Journey
            </h2>

            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
              Join thousands of traders who trust our AI to grow their
              portfolios. No experience needed - our bot does all the heavy
              lifting.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-10 py-5 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-bold text-xl hover:from-teal-600 hover:to-teal-700 transition-all shadow-2xl shadow-teal-500/30"
            >
              <a
                className="flex items-center justify-center gap-3"
                href="/signup"
              >
                Launch Trading
                <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
              </a>
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {[
                { value: "10,000+", label: "Active Traders" },
                { value: "$250M+", label: "Total Volume" },
                { value: "98%", label: "Satisfaction Rate" },
                { value: "24/7", label: "Support" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-teal-400">
                    {stat.value}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
                    Stratix
                  </h2>
                </div>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Advanced AI-powered forex trading platform that executes
                profitable trades 24/7 with maximum security and minimal risk.
              </p>
            </div>

            {/* Links Columns */}
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "API", "Documentation"],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Press"],
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
                        className="text-gray-400 hover:text-teal-400 transition-colors"
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
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Stratix. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

// src/pages/Bot.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRobot,
  FaCrown,
  FaStar,
  FaCheckCircle,
  FaLock,
  FaCreditCard,
  FaCalendarAlt,
  FaUser,
  FaShieldAlt,
  FaBolt,
  FaChartLine,
  FaPercentage,
  FaArrowUp,
  FaTimes,
  FaHome,
  FaMapMarkerAlt,
  FaCity,
  FaGlobe,
} from "react-icons/fa";

const Bot = () => {
  const [selectedBot, setSelectedBot] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const botTiers = [
    {
      id: 1,
      name: "Scalper Bot",
      tier: "High Frequency",
      icon: <FaBolt className="text-3xl text-yellow-500" />,
      price: "$199",
      profit: "+8-12% daily",
      accuracy: "92%",
      features: [
        "High-frequency scalping",
        "Real-time market analysis",
        "Quick entry/exit strategies",
        "5ms trade execution",
        "24/7 operation",
      ],
      color: "from-yellow-900/20 to-yellow-800/10",
    },
    {
      id: 2,
      name: "Trend Bot",
      tier: "Market Trend",
      icon: <FaChartLine className="text-3xl text-teal-500" />,
      price: "$349",
      profit: "+15-25% weekly",
      accuracy: "88%",
      features: [
        "Trend identification",
        "Multi-timeframe analysis",
        "Smart stop-loss",
        "Pattern recognition",
        "Market sentiment analysis",
      ],
      color: "from-teal-900/30 to-teal-800/20",
    },
    {
      id: 3,
      name: "Arbitrage Bot",
      tier: "Price Difference",
      icon: <FaPercentage className="text-3xl text-blue-500" />,
      price: "$499",
      profit: "+5-8% daily",
      accuracy: "95%",
      features: [
        "Multi-exchange arbitrage",
        "Real-time price monitoring",
        "Instant execution",
        "Low latency connections",
        "Risk-free opportunities",
      ],
      color: "from-blue-900/30 to-blue-800/20",
    },
    {
      id: 4,
      name: "Pro Bot",
      tier: "Advanced AI",
      icon: <FaCrown className="text-3xl text-purple-500" />,
      price: "$999",
      profit: "+25-40% monthly",
      accuracy: "85%",
      features: [
        "Deep learning AI",
        "Multiple strategies",
        "Adaptive algorithms",
        "Portfolio management",
        "Customizable parameters",
      ],
      color: "from-purple-900/30 to-purple-800/20",
    },
  ];

  const validateCardNumber = (number) => {
    // Remove spaces and non-digits
    const cleanNumber = number.replace(/\D/g, "");

    // Luhn algorithm validation
    let sum = 0;
    let shouldDouble = false;

    for (let i = cleanNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNumber.charAt(i), 10);

      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
  };

  const validateExpiryDate = (date) => {
    // Validate MM/YY format
    const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!regex.test(date)) return false;

    const [month, year] = date.split("/").map(Number);
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    // Check if date is in the future
    if (year < currentYear) return false;
    if (year === currentYear && month < currentMonth) return false;

    return true;
  };

  const validateCVV = (cvv) => {
    return /^\d{3,4}$/.test(cvv);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = formatCardNumber(value);
    } else if (name === "expiryDate") {
      formattedValue = formatExpiryDate(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateStep = (step) => {
    const errors = {};

    if (step === 1) {
      if (!formData.firstName.trim())
        errors.firstName = "First name is required";
      if (!formData.lastName.trim()) errors.lastName = "Last name is required";
      if (!formData.email.trim()) {
        errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "Email is invalid";
      }
      if (!formData.street.trim()) errors.street = "Street address is required";
      if (!formData.city.trim()) errors.city = "City is required";
      if (!formData.zipCode.trim()) errors.zipCode = "ZIP code is required";
      if (!formData.country.trim()) errors.country = "Country is required";
    }

    if (step === 2) {
      const cleanCardNumber = formData.cardNumber.replace(/\s/g, "");
      if (!cleanCardNumber) {
        errors.cardNumber = "Card number is required";
      } else if (cleanCardNumber.length < 16) {
        errors.cardNumber = "Card number must be 16 digits";
      } else if (!validateCardNumber(cleanCardNumber)) {
        errors.cardNumber = "Invalid card number";
      }

      if (!formData.expiryDate) {
        errors.expiryDate = "Expiry date is required";
      } else if (!validateExpiryDate(formData.expiryDate)) {
        errors.expiryDate = "Invalid expiry date (MM/YY)";
      }

      if (!formData.cvv) {
        errors.cvv = "CVV is required";
      } else if (!validateCVV(formData.cvv)) {
        errors.cvv = "Invalid CVV (3-4 digits)";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpgrade = (bot) => {
    setSelectedBot(bot);
    setIsPaymentModalOpen(true);
    setPaymentStep(1);
    setFormErrors({});
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(paymentStep)) {
      return;
    }

    if (paymentStep < 2) {
      setPaymentStep(paymentStep + 1);
    } else {
      setIsProcessing(true);

      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false);
        alert(`Payment successful! ${selectedBot.name} has been activated.`);
        setIsPaymentModalOpen(false);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          street: "",
          apartment: "",
          city: "",
          state: "",
          zipCode: "",
          country: "",
          cardNumber: "",
          expiryDate: "",
          cvv: "",
        });
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-2 md:p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-teal-900/30 to-teal-800/20 rounded-2xl flex items-center justify-center border border-teal-800/30">
            <FaRobot className="text-3xl text-teal-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">AI Trading Bots</h1>
            <p className="text-gray-400">Select and upgrade your trading bot</p>
          </div>
        </div>
      </motion.div>

      {/* Bots Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
      >
        {botTiers.map((bot) => (
          <motion.div
            key={bot.id}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`bg-gradient-to-b ${bot.color} rounded-2xl border border-gray-800 p-6 relative overflow-hidden`}
          >
            <div className="text-center mb-6">
              <div className="inline-block p-4 rounded-2xl bg-black/30 mb-4">
                {bot.icon}
              </div>
              <h3 className="text-xl font-bold mb-1">{bot.name}</h3>
              <p className="text-gray-400 text-sm">{bot.tier}</p>
            </div>

            {/* Profit & Accuracy */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-black/30 rounded-xl p-4 text-center">
                <div className="text-green-400 text-lg font-bold">
                  {bot.profit}
                </div>
                <p className="text-gray-400 text-xs">Average Profit</p>
              </div>
              <div className="bg-black/30 rounded-xl p-4 text-center">
                <div className="text-teal-400 text-lg font-bold">
                  {bot.accuracy}
                </div>
                <p className="text-gray-400 text-xs">Trading Accuracy</p>
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-2 mb-6">
              {bot.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm">
                  <FaCheckCircle className="text-teal-400 mr-2 flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Price & Upgrade Button */}
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{bot.price}</div>
              <button
                onClick={() => handleUpgrade(bot)}
                className="w-full py-3 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg font-semibold hover:from-teal-600 hover:to-teal-700 transition-all flex items-center justify-center space-x-2"
              >
                <span>Upgrade Now</span>
                <FaArrowUp />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Payment Modal */}
      <AnimatePresence>
        {isPaymentModalOpen && selectedBot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50"
            onClick={() => !isProcessing && setIsPaymentModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gradient-to-b from-gray-900 to-black rounded-2xl border border-gray-800 w-full max-w-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-800 flex items-center justify-between sticky top-0 bg-gray-900/90 backdrop-blur-sm">
                <div>
                  <h2 className="text-2xl font-bold">
                    Upgrade to {selectedBot.name}
                  </h2>
                  <p className="text-gray-400">
                    Complete your payment to activate the bot
                  </p>
                </div>
                {!isProcessing && (
                  <button
                    onClick={() => setIsPaymentModalOpen(false)}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>

              {/* Progress Steps */}
              <div className="px-6 pt-6">
                <div className="flex items-center justify-center mb-8">
                  {["Billing Address", "Payment Details"].map((step, index) => (
                    <div key={step} className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          paymentStep > index + 1
                            ? "bg-teal-900 text-teal-400"
                            : paymentStep === index + 1
                            ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white"
                            : "bg-gray-800 text-gray-400"
                        }`}
                      >
                        {paymentStep > index + 1 ? (
                          <FaCheckCircle />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <span
                        className={`ml-2 ${
                          paymentStep >= index + 1
                            ? "text-white"
                            : "text-gray-400"
                        }`}
                      >
                        {step}
                      </span>
                      {index < 1 && (
                        <div
                          className={`w-16 h-0.5 mx-4 ${
                            paymentStep > index + 1
                              ? "bg-teal-500"
                              : "bg-gray-800"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Form */}
              <form onSubmit={handlePaymentSubmit} className="p-6">
                {paymentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-bold mb-4">
                      Precise Billing Address
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          <FaUser className="inline mr-2" />
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                          placeholder="John"
                        />
                        {formErrors.firstName && (
                          <p className="text-red-400 text-sm mt-1">
                            {formErrors.firstName}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                          placeholder="Doe"
                        />
                        {formErrors.lastName && (
                          <p className="text-red-400 text-sm mt-1">
                            {formErrors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="john@example.com"
                      />
                      {formErrors.email && (
                        <p className="text-red-400 text-sm mt-1">
                          {formErrors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <FaHome className="inline mr-2" />
                        Street Address *
                      </label>
                      <input
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="123 Main Street"
                      />
                      {formErrors.street && (
                        <p className="text-red-400 text-sm mt-1">
                          {formErrors.street}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Apartment/Suite (Optional)
                      </label>
                      <input
                        type="text"
                        name="apartment"
                        value={formData.apartment}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Apt 4B"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          <FaCity className="inline mr-2" />
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                          placeholder="New York"
                        />
                        {formErrors.city && (
                          <p className="text-red-400 text-sm mt-1">
                            {formErrors.city}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          State/Province
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                          placeholder="NY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          ZIP/Postal Code *
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                          placeholder="10001"
                        />
                        {formErrors.zipCode && (
                          <p className="text-red-400 text-sm mt-1">
                            {formErrors.zipCode}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <FaGlobe className="inline mr-2" />
                        Country *
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="">Select Country</option>
                        <option value="US">United States</option>
                        <option value="UK">United Kingdom</option>
                        <option value="CA">Canada</option>
                        <option value="AU">Australia</option>
                        <option value="DE">Germany</option>
                        <option value="FR">France</option>
                      </select>
                      {formErrors.country && (
                        <p className="text-red-400 text-sm mt-1">
                          {formErrors.country}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {paymentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-bold mb-4">Card Details</h3>

                    <div className="bg-gradient-to-r from-gray-900 to-black rounded-xl p-6 border border-gray-800 mb-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {selectedBot.icon}
                          <div>
                            <h4 className="font-bold">{selectedBot.name}</h4>
                            <p className="text-gray-400 text-sm">
                              {selectedBot.tier}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">
                            {selectedBot.price}
                          </div>
                          <p className="text-green-400 text-sm">
                            {selectedBot.profit} profit
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          <FaCreditCard className="inline mr-2" />
                          Card Number *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            maxLength="19"
                            required
                            placeholder="4242 4242 4242 4242"
                            className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaCreditCard className="text-gray-500" />
                          </div>
                        </div>
                        {formErrors.cardNumber && (
                          <p className="text-red-400 text-sm mt-1">
                            {formErrors.cardNumber}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            <FaCalendarAlt className="inline mr-2" />
                            Expiry Date (MM/YY) *
                          </label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            maxLength="5"
                            required
                            placeholder="12/25"
                            className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                          {formErrors.expiryDate && (
                            <p className="text-red-400 text-sm mt-1">
                              {formErrors.expiryDate}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            <FaLock className="inline mr-2" />
                            CVV *
                          </label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            maxLength="4"
                            required
                            placeholder="123"
                            className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                          {formErrors.cvv && (
                            <p className="text-red-400 text-sm mt-1">
                              {formErrors.cvv}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-4 bg-gray-900/50 rounded-lg">
                        <FaLock className="text-teal-400" />
                        <span className="text-sm text-gray-300">
                          Your card details are secured with end-to-end
                          encryption
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Form Actions */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-800">
                  {paymentStep > 1 ? (
                    <button
                      type="button"
                      onClick={() => setPaymentStep(paymentStep - 1)}
                      disabled={isProcessing}
                      className="px-6 py-3 bg-gray-800 rounded-lg font-semibold hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Back
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsPaymentModalOpen(false)}
                      disabled={isProcessing}
                      className="px-6 py-3 bg-gray-800 rounded-lg font-semibold hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Cancel
                    </button>
                  )}

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg font-semibold hover:from-teal-600 hover:to-teal-700 transition-all flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : paymentStep < 2 ? (
                      <>
                        <span>Continue</span>
                        <FaArrowUp />
                      </>
                    ) : (
                      <>
                        <FaLock className="mr-2" />
                        <span>Pay {selectedBot.price}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Security Footer */}
              <div className="px-6 py-4 bg-black/50 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <FaShieldAlt className="text-teal-400" />
                    <span>256-bit SSL Encryption</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-400">We accept:</div>
                  <div className="flex space-x-2">
                    <div className="w-10 h-6 bg-gray-700 rounded flex items-center justify-center text-xs">
                      Visa
                    </div>
                    <div className="w-10 h-6 bg-gray-700 rounded flex items-center justify-center text-xs">
                      MC
                    </div>
                    <div className="w-10 h-6 bg-gray-700 rounded flex items-center justify-center text-xs">
                      Amex
                    </div>
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

export default Bot;

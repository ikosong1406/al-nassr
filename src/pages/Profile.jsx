// src/pages/Profile.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaWallet,
  FaCreditCard,
  FaUser,
  FaShieldAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaArrowDown,
  FaCreditCard as FaCard,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const Profile = () => {
  // Main State
  const [availableBalance, setAvailableBalance] = useState(1250.75);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showCVV, setShowCVV] = useState({});

  // User Data
  const [userData, setUserData] = useState({
    fullName: "Ahmed Al-Rashid",
    email: "ahmed.alrashid@example.com",
    phone: "+966 50 123 4567",
    country: "Saudi Arabia",
    memberSince: "Jan 2024",
    accountTier: "Gold",
  });

  // Payment Methods (Cards Only)
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "Visa",
      lastFour: "4242",
      issuer: "Al Rajhi Bank",
      isDefault: true,
      expiry: "12/26",
      holderName: "Ahmed Al-Rashid",
      color: "from-blue-500 to-purple-600",
    },
  ]);

  // Card Form
  const [cardForm, setCardForm] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    isDefault: true,
  });

  // Format Currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-SA", {
      style: "currency",
      currency: "SAR",
      minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    }).format(amount);
  };

  // Handle Withdrawal
  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    if (amount > availableBalance) {
      alert("Insufficient balance");
      return;
    }

    setAvailableBalance((prev) => prev - amount);
    setShowWithdrawModal(false);
    setWithdrawAmount("");

    alert(`Withdrawal of ${formatCurrency(amount)} initiated successfully!`);
  };

  // Handle Add Card
  const handleAddCard = () => {
    if (
      !cardForm.cardNumber ||
      !cardForm.cardHolder ||
      !cardForm.expiryMonth ||
      !cardForm.expiryYear ||
      !cardForm.cvv
    ) {
      alert("Please fill all card details");
      return;
    }

    const newCard = {
      id: paymentMethods.length + 1,
      type: cardForm.cardNumber.startsWith("4") ? "Visa" : "Mastercard",
      lastFour: cardForm.cardNumber.slice(-4),
      issuer: "Bank",
      isDefault: cardForm.isDefault,
      expiry: `${cardForm.expiryMonth}/${cardForm.expiryYear.slice(-2)}`,
      holderName: cardForm.cardHolder,
      color: cardForm.cardNumber.startsWith("4")
        ? "from-blue-500 to-purple-600"
        : "from-red-500 to-orange-500",
    };

    const updatedMethods = cardForm.isDefault
      ? paymentMethods.map((method) => ({ ...method, isDefault: false }))
      : [...paymentMethods];

    setPaymentMethods([...updatedMethods, newCard]);
    setShowAddCardModal(false);
    setCardForm({
      cardNumber: "",
      cardHolder: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      isDefault: true,
    });

    alert("Card added successfully!");
  };

  // Set Default Card
  const handleSetDefault = (id) => {
    setPaymentMethods((methods) =>
      methods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    );
  };

  // Delete Card
  const handleDeleteCard = (id) => {
    if (
      paymentMethods.find((m) => m.id === id)?.isDefault &&
      paymentMethods.length > 1
    ) {
      alert("Please set another card as default before deleting this one.");
      return;
    }
    setPaymentMethods((methods) => methods.filter((m) => m.id !== id));
  };

  // Copy to Clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen text-white md:p-6">
      {/* Main Container */}
      <div className="max-w-6xl mx-auto">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Wallet & Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Wallet Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/30 rounded-2xl p-6 border border-gray-700/30 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="text-lg font-bold text-white">
                    Wallet Balance
                  </h2>
                </div>
                <div className="p-3 bg-gradient-to-br from-yellow-300/20 to-yellow-400/10 rounded-xl border border-yellow-500/20">
                  <FaWallet className="text-yellow-300 text-xl" />
                </div>
              </div>

              <div className="mb-8">
                <div className="text-3xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent mb-2">
                  {formatCurrency(availableBalance)}
                </div>
                <div className="text-gray-400">
                  ≈ $
                  {(availableBalance / 3.75).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>

              <button
                onClick={() => setShowWithdrawModal(true)}
                className="w-full py-4 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-xl font-bold text-gray-900 transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg shadow-yellow-500/20"
              >
                <FaArrowDown />
                <span>Withdraw Funds</span>
              </button>
            </motion.div>

            {/* Payment Methods */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-gray-800/40 to-gray-900/20 rounded-2xl p-4 border border-gray-700/30 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Payment Methods
                  </h2>
                </div>
                <button
                  onClick={() => setShowAddCardModal(true)}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2"
                >
                  <FaPlus />
                  <span>Add Card</span>
                </button>
              </div>

              <div className="space-y-4">
                {paymentMethods.map((card) => (
                  <div
                    key={card.id}
                    className={`relative overflow-hidden rounded-2xl p-6 border transition-all duration-300 ${
                      card.isDefault
                        ? "border-yellow-500/50 bg-gradient-to-r from-yellow-900/20 to-yellow-800/10"
                        : "border-gray-700/50 bg-gradient-to-r from-gray-900/30 to-gray-800/20 hover:border-gray-600/50"
                    }`}
                  >
                    {card.isDefault && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-xs font-bold rounded-full flex items-center">
                          <FaCheckCircle className="mr-1" /> Default
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-3 rounded-xl bg-gradient-to-br ${card.color} shadow-lg`}
                        >
                          <FaCreditCard className="text-white text-2xl" />
                        </div>
                        <div>
                          <div className="font-bold text-white text-lg">
                            {card.type} •••• {card.lastFour}
                          </div>
                          <div className="text-gray-400 text-sm">
                            {card.holderName} • Expires {card.expiry}
                          </div>
                          <div className="text-gray-500 text-xs mt-1">
                            {card.issuer}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {!card.isDefault && (
                          <button
                            onClick={() => handleSetDefault(card.id)}
                            className="px-3 py-1.5 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg text-sm transition-colors"
                          >
                            Set Default
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteCard(card.id)}
                          className="p-2 hover:bg-red-900/30 rounded-lg transition-colors text-red-400"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Quick Actions & Info */}
          <div className="space-y-6">
            {/* Account Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-gray-800/40 to-gray-900/20 rounded-2xl p-6 border border-gray-700/30 backdrop-blur-sm"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-xl border border-blue-500/20">
                  <FaUser className="text-blue-400 text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Account Overview</h3>
                  <p className="text-gray-400 text-sm">Quick details</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-gray-400 text-sm">Member Since</div>
                  <div className="text-white font-medium">
                    {userData.memberSince}
                  </div>
                </div>

                <div>
                  <div className="text-gray-400 text-sm">Country</div>
                  <div className="text-white font-medium">
                    {userData.country}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowProfileModal(true)}
                className="w-full mt-6 py-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl border border-gray-700/50 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <FaEdit />
                <span>View Full Profile</span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Withdraw Modal */}
      <AnimatePresence>
        {showWithdrawModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowWithdrawModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl w-full max-w-md overflow-hidden border border-gray-700/50 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 rounded-lg">
                      <FaArrowDown className="text-yellow-300" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">
                        Withdraw Funds
                      </h2>
                      <p className="text-gray-400 text-sm">
                        Transfer to your card
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowWithdrawModal(false)}
                    className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Default Card Info */}
                <div className="mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-900/30 rounded-xl border border-gray-700/30">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-gray-400 text-sm">Withdrawing to</div>
                    <div className="text-xs text-yellow-300 font-semibold">
                      Default
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaCreditCard className="text-blue-400" />
                    <div>
                      <div className="font-bold text-white">
                        {paymentMethods.find((c) => c.isDefault)?.type} ••••{" "}
                        {paymentMethods.find((c) => c.isDefault)?.lastFour}
                      </div>
                      <div className="text-gray-400 text-sm">
                        Expires{" "}
                        {paymentMethods.find((c) => c.isDefault)?.expiry}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Amount Input */}
                <div className="mb-8">
                  <label className="block text-gray-400 mb-3 font-medium">
                    Amount (SAR)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full p-4 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white text-2xl font-bold placeholder-gray-600 focus:outline-none focus:border-yellow-300/50 focus:ring-2 focus:ring-yellow-300/20 transition-all"
                      min="1"
                      max={availableBalance}
                      step="0.01"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                      SAR
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-gray-400 flex justify-between">
                    <span>Available: {formatCurrency(availableBalance)}</span>
                    <button
                      onClick={() =>
                        setWithdrawAmount(availableBalance.toString())
                      }
                      className="text-yellow-300 hover:text-yellow-300 transition-colors"
                    >
                      Use Max
                    </button>
                  </div>
                </div>

                {/* Info Box */}
                <div className="mb-8 p-4 bg-gradient-to-r from-blue-900/20 to-blue-800/10 rounded-xl border border-blue-700/30">
                  <div className="flex items-start space-x-3">
                    <div>
                      <h4 className="font-semibold text-blue-300 mb-1">
                        Processing Time
                      </h4>
                      <p className="text-blue-100 text-sm">
                        Withdrawals typically process within 24-48 hours. You'll
                        receive an email confirmation once completed.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowWithdrawModal(false)}
                    className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-semibold transition-all duration-300 border border-gray-700/50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleWithdraw}
                    disabled={
                      !withdrawAmount ||
                      parseFloat(withdrawAmount) <= 0 ||
                      parseFloat(withdrawAmount) > availableBalance
                    }
                    className="flex-1 py-3 bg-gradient-to-r from-yellow-300 to-yellow-400 hover:to-yellow-700 rounded-xl font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-yellow-500/20"
                  >
                    Confirm Withdrawal
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Card Modal */}
      <AnimatePresence>
        {showAddCardModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowAddCardModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl w-full max-w-md overflow-hidden border border-gray-700/50 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-lg">
                      <FaPlus className="text-blue-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">
                        Add New Card
                      </h2>
                      <p className="text-gray-400 text-sm">
                        Secure payment method
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAddCardModal(false)}
                    className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Form */}
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 mb-2 text-sm font-medium">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardForm.cardNumber}
                      onChange={(e) =>
                        setCardForm({ ...cardForm, cardNumber: e.target.value })
                      }
                      placeholder="1234 5678 9012 3456"
                      className="w-full p-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      maxLength="19"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-2 text-sm font-medium">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={cardForm.cardHolder}
                      onChange={(e) =>
                        setCardForm({ ...cardForm, cardHolder: e.target.value })
                      }
                      placeholder="AHMED AL-RASHID"
                      className="w-full p-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 mb-2 text-sm font-medium">
                        Expiry Date
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={cardForm.expiryMonth}
                          onChange={(e) =>
                            setCardForm({
                              ...cardForm,
                              expiryMonth: e.target.value,
                            })
                          }
                          placeholder="MM"
                          className="w-full p-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                          maxLength="2"
                        />
                        <input
                          type="text"
                          value={cardForm.expiryYear}
                          onChange={(e) =>
                            setCardForm({
                              ...cardForm,
                              expiryYear: e.target.value,
                            })
                          }
                          placeholder="YY"
                          className="w-full p-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                          maxLength="2"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-2 text-sm font-medium">
                        CVV
                      </label>
                      <div className="relative">
                        <input
                          type={
                            showCVV[cardForm.cardNumber] ? "text" : "password"
                          }
                          value={cardForm.cvv}
                          onChange={(e) =>
                            setCardForm({ ...cardForm, cvv: e.target.value })
                          }
                          placeholder="123"
                          className="w-full p-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                          maxLength="4"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowCVV({
                              ...showCVV,
                              [cardForm.cardNumber]:
                                !showCVV[cardForm.cardNumber],
                            })
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        >
                          {showCVV[cardForm.cardNumber] ? (
                            <FaEyeSlash />
                          ) : (
                            <FaEye />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-900/30 rounded-lg border border-gray-700/30">
                    <input
                      type="checkbox"
                      id="defaultCard"
                      checked={cardForm.isDefault}
                      onChange={(e) =>
                        setCardForm({
                          ...cardForm,
                          isDefault: e.target.checked,
                        })
                      }
                      className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500 focus:ring-2 border-gray-600 bg-gray-800"
                    />
                    <label
                      htmlFor="defaultCard"
                      className="text-sm text-gray-300"
                    >
                      Set as default payment method
                    </label>
                  </div>

                  {/* Security Badge */}
                  <div className="p-3 bg-gradient-to-r from-green-900/20 to-green-800/10 rounded-lg border border-green-700/30">
                    <div className="flex items-center space-x-2">
                      <FaShieldAlt className="text-green-400" />
                      <span className="text-sm text-green-300">
                        Your information is encrypted and secure
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3 pt-2">
                    <button
                      onClick={() => setShowAddCardModal(false)}
                      className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-semibold transition-all duration-300 border border-gray-700/50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddCard}
                      className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl font-bold transition-all duration-300"
                    >
                      Add Card
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Modal */}
      <AnimatePresence>
        {showProfileModal && (
          <ProfileModal
            userData={userData}
            onClose={() => setShowProfileModal(false)}
            onUpdate={(data) => setUserData(data)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Profile Modal Component
const ProfileModal = ({ userData, onClose, onUpdate }) => {
  const [formData, setFormData] = useState(userData);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl w-full max-w-2xl overflow-hidden border border-gray-700/50 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-lg">
                <FaUser className="text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Profile Details
                </h2>
                <p className="text-gray-400 text-sm">
                  Manage your personal information
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-400 mb-2 text-sm font-medium">
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full p-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              ) : (
                <div className="p-3 bg-gray-900/30 rounded-lg border border-gray-700/30">
                  <div className="font-bold text-white">
                    {userData.fullName}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-gray-400 mb-2 text-sm font-medium">
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full p-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              ) : (
                <div className="p-3 bg-gray-900/30 rounded-lg border border-gray-700/30">
                  <div className="font-bold text-white">{userData.email}</div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-gray-400 mb-2 text-sm font-medium">
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full p-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              ) : (
                <div className="p-3 bg-gray-900/30 rounded-lg border border-gray-700/30">
                  <div className="font-bold text-white">{userData.phone}</div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-gray-400 mb-2 text-sm font-medium">
                Country
              </label>
              {isEditing ? (
                <select
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                  className="w-full p-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                >
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="United Arab Emirates">
                    United Arab Emirates
                  </option>
                  <option value="Qatar">Qatar</option>
                  <option value="Kuwait">Kuwait</option>
                  <option value="Bahrain">Bahrain</option>
                  <option value="Oman">Oman</option>
                </select>
              ) : (
                <div className="p-3 bg-gray-900/30 rounded-lg border border-gray-700/30">
                  <div className="font-bold text-white">{userData.country}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Profile;

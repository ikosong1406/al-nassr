import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
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
import localforage from "localforage";
import Api from "../components/Api";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  // Main State
  const [loading, setLoading] = useState(true);
  const [availableBalance, setAvailableBalance] = useState(0);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showCVV, setShowCVV] = useState({});

  // User Data
  const [userData, setUserData] = useState({
    _id: "",
    firstname: "",
    lastname: "",
    email: "",
    balance: 0,
    createdAt: "",
    card: {
      cardNumber: null,
      cardName: null,
      expiryDate: null,
      cvv: null,
    },
    billingAddress: {
      address: null,
      state: null,
      country: null,
    },
  });

  // Payment Methods (Cards Only)
  const [paymentMethods, setPaymentMethods] = useState([]);

  // Card Form
  const [cardForm, setCardForm] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  // Format Currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-SA", {
      style: "currency",
      currency: "SAR",
      minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    }).format(amount);
  };

  // Get token from localforage
  const getToken = async () => {
    try {
      const token = await localforage.getItem("authToken");
      if (!token) {
        toast.error("Session expired. Please login again.");
        navigate("/login");
        return null;
      }
      return token;
    } catch (error) {
      console.error("Error getting token:", error);
      toast.error("Error loading session");
      return null;
    }
  };

  // Get userId from localforage
  const getUserId = async () => {
    try {
      const userEmail = await localforage.getItem("userEmail");
      return userEmail; // Using email as identifier since we don't have userId in response
    } catch (error) {
      console.error("Error getting user email:", error);
      return null;
    }
  };

  // Fetch user data from backend
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const token = await getToken();
    if (!token) return;

    try {
      setLoading(true);
      const response = await axios.post(`${Api}/getUser`, { token });

      if (response.data.success) {
        const user = response.data.user;
        setUserData(user);
        setAvailableBalance(user.balance || 0);

        // Format member since date
        if (user.createdAt) {
          const date = new Date(user.createdAt);
          user.memberSince = date.toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          });
        }

        // If user has a card, add it to payment methods
        if (user.card && user.card.cardNumber) {
          const userCard = {
            id: 1,
            type: user.card.cardNumber.startsWith("4") ? "Visa" : "Mastercard",
            lastFour: user.card.cardNumber.slice(-4),
            issuer: "Bank",
            isDefault: true,
            expiry: user.card.expiryDate || "12/26",
            holderName:
              user.card.cardName || `${user.firstname} ${user.lastname}`,
            color: user.card.cardNumber.startsWith("4")
              ? "from-blue-500 to-purple-600"
              : "from-red-500 to-orange-500",
          };
          setPaymentMethods([userCard]);
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        navigate("/login");
      } else {
        const errorMessage =
          error.response?.data?.error || "Failed to load user data";
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Withdrawal
  const handleWithdraw = async () => {
    const amount = parseFloat(withdrawAmount);
    if (!amount || amount <= 500) {
      toast.error("Please enter a valid amount (minimum 500 SAR)");
      return;
    }

    if (amount > availableBalance) {
      toast.error("Insufficient balance");
      return;
    }

    // Check if user has a payment method
    if (!userData.card || !userData.card.cardNumber) {
      toast.error("Please add a card first before withdrawing");
      setShowWithdrawModal(false);
      setShowAddCardModal(true);
      return;
    }

    try {
      const token = await getToken();
      if (!token) return;

      // Send withdrawal request
      const response = await axios.post(`${Api}/withdraw`, {
        userId: userData._id, // Send userId from userData
        amount: amount,
      });

      if (response.data.success) {
        // Update local balance
        setAvailableBalance((prev) => prev - amount);
        setShowWithdrawModal(false);
        setWithdrawAmount("");

        toast.success(
          `Withdrawal of ${formatCurrency(amount)} initiated successfully!`,
        );
        
        // Refresh user data to get updated balance
        fetchUserData();
      }
    } catch (error) {
      console.error("Withdrawal error:", error);
      const errorMessage = error.response?.data?.error || "Withdrawal failed";
      toast.error(errorMessage);
    }
  };

  // Handle Add Card
  const handleAddCard = async () => {
    if (
      !cardForm.cardNumber ||
      !cardForm.cardHolder ||
      !cardForm.expiryMonth ||
      !cardForm.expiryYear ||
      !cardForm.cvv
    ) {
      toast.error("Please fill all card details");
      return;
    }

    if (cardForm.cardNumber.length < 16) {
      toast.error("Please enter a valid card number (16 digits)");
      return;
    }

    if (cardForm.cvv.length < 3) {
      toast.error("Please enter a valid CVV (3-4 digits)");
      return;
    }

    try {
      const token = await getToken();
      if (!token) return;

      // Format expiry date
      const expiryDate = `${cardForm.expiryMonth}/${cardForm.expiryYear.slice(-2)}`;

      // Send card save request
      const response = await axios.post(`${Api}/addCard`, {
        userId: userData._id, // Send userId from userData
        cardNumber: cardForm.cardNumber.replace(/\s/g, ""), // Remove spaces
        cardName: cardForm.cardHolder,
        expiryDate: expiryDate,
        cvv: cardForm.cvv,
      });

      if (response.data.message === "Card saved successfully") {
        // Add card to payment methods
        const newCard = {
          id: paymentMethods.length + 1,
          type: cardForm.cardNumber.startsWith("4") ? "Visa" : "Mastercard",
          lastFour: cardForm.cardNumber.slice(-4),
          issuer: "Bank",
          isDefault: true,
          expiry: expiryDate,
          holderName: cardForm.cardHolder,
          color: cardForm.cardNumber.startsWith("4")
            ? "from-blue-500 to-purple-600"
            : "from-red-500 to-orange-500",
        };

        setPaymentMethods([newCard]); // Replace with new card
        setShowAddCardModal(false);
        
        // Reset form
        setCardForm({
          cardNumber: "",
          cardHolder: "",
          expiryMonth: "",
          expiryYear: "",
          cvv: "",
        });

        toast.success("Card added successfully!");
        
        // Refresh user data to get updated card info
        fetchUserData();
      }
    } catch (error) {
      console.error("Card save error:", error);
      const errorMessage = error.response?.data?.error || "Failed to add card";
      toast.error(errorMessage);
    }
  };

  // Update user profile
  const handleUpdateProfile = async (updatedData) => {
    try {
      const token = await getToken();
      if (!token) return;

      const response = await axios.put(`${Api}/user/profile`, {
        token,
        ...updatedData,
      });

      if (response.data.success) {
        setUserData(updatedData);
        toast.success("Profile updated successfully");
        setShowProfileModal(false);
        
        // Refresh user data
        fetchUserData();
      }
    } catch (error) {
      console.error("Profile update error:", error);
      const errorMessage =
        error.response?.data?.error || "Failed to update profile";
      toast.error(errorMessage);
    }
  };

  // Format card number for display
  const formatCardNumber = (cardNumber) => {
    if (!cardNumber) return "•••• •••• •••• ••••";
    const lastFour = cardNumber.slice(-4);
    return `•••• •••• •••• ${lastFour}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white md:p-6">
      {/* Toast notifications */}
      <Toaster position="top-center" />

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
                disabled={availableBalance <= 0}
                className={`w-full py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg ${
                  availableBalance > 0
                    ? "bg-gradient-to-r from-yellow-300 to-yellow-400 text-gray-900 shadow-yellow-500/20 hover:from-yellow-400 hover:to-yellow-500"
                    : "bg-gray-700 text-gray-400 cursor-not-allowed"
                }`}
              >
                <FaArrowDown />
                <span>
                  {availableBalance > 0 ? "Withdraw Funds" : "No Funds Available"}
                </span>
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
                  <span>{paymentMethods.length > 0 ? "Update Card" : "Add Card"}</span>
                </button>
              </div>

              <div className="space-y-4">
                {paymentMethods.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <FaCreditCard className="text-4xl mx-auto mb-3 opacity-50" />
                    <p>No payment methods added yet</p>
                    <p className="text-sm text-yellow-300 mt-2">
                      Add a card to withdraw funds
                    </p>
                    <button
                      onClick={() => setShowAddCardModal(true)}
                      className="mt-3 text-yellow-300 hover:text-yellow-300 underline"
                    >
                      Add your first card
                    </button>
                  </div>
                ) : (
                  paymentMethods.map((card) => (
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
                      </div>
                    </div>
                  ))
                )}
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
                  <div className="text-gray-400 text-sm">Name</div>
                  <div className="text-white font-medium">
                    {userData.firstname} {userData.lastname}
                  </div>
                </div>

                <div>
                  <div className="text-gray-400 text-sm">Email</div>
                  <div className="text-white font-medium">{userData.email}</div>
                </div>

                <div>
                  <div className="text-gray-400 text-sm">Member Since</div>
                  <div className="text-white font-medium">
                    {userData.memberSince || "N/A"}
                  </div>
                </div>

                <div>
                  <div className="text-gray-400 text-sm">Account ID</div>
                  <div className="text-white font-medium text-xs font-mono">
                    {userData._id?.slice(-8) || "N/A"}
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
          <WithdrawModal
            showWithdrawModal={showWithdrawModal}
            setShowWithdrawModal={setShowWithdrawModal}
            withdrawAmount={withdrawAmount}
            setWithdrawAmount={setWithdrawAmount}
            availableBalance={availableBalance}
            paymentMethods={paymentMethods}
            handleWithdraw={handleWithdraw}
            formatCurrency={formatCurrency}
            userCard={userData.card}
          />
        )}
      </AnimatePresence>

      {/* Add Card Modal */}
      <AnimatePresence>
        {showAddCardModal && (
          <AddCardModal
            showAddCardModal={showAddCardModal}
            setShowAddCardModal={setShowAddCardModal}
            cardForm={cardForm}
            setCardForm={setCardForm}
            showCVV={showCVV}
            setShowCVV={setShowCVV}
            handleAddCard={handleAddCard}
            userData={userData}
          />
        )}
      </AnimatePresence>

      {/* Profile Modal */}
      <AnimatePresence>
        {showProfileModal && (
          <ProfileModal
            userData={userData}
            onClose={() => setShowProfileModal(false)}
            onUpdate={handleUpdateProfile}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Withdraw Modal Component
const WithdrawModal = ({
  showWithdrawModal,
  setShowWithdrawModal,
  withdrawAmount,
  setWithdrawAmount,
  availableBalance,
  paymentMethods,
  handleWithdraw,
  formatCurrency,
  userCard,
}) => {
  return (
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
                <h2 className="text-xl font-bold text-white">Withdraw Funds</h2>
                <p className="text-gray-400 text-sm">Transfer to your card</p>
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
          {/* Card Info */}
          <div className="mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-900/30 rounded-xl border border-gray-700/30">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-400 text-sm">Withdrawing to</div>
              <div className="text-xs text-yellow-300 font-semibold">
                Default Card
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FaCreditCard className="text-blue-400" />
              <div>
                <div className="font-bold text-white">
                  {userCard?.cardNumber 
                    ? (userCard.cardNumber.startsWith("4") ? "Visa" : "Mastercard") + 
                      " •••• " + 
                      userCard.cardNumber.slice(-4)
                    : "No card added"}
                </div>
                {userCard?.expiryDate && (
                  <div className="text-gray-400 text-sm">
                    Expires {userCard.expiryDate}
                  </div>
                )}
                {!userCard?.cardNumber && (
                  <div className="text-yellow-300 text-sm mt-1">
                    Add a card to withdraw funds
                  </div>
                )}
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
                disabled={!userCard?.cardNumber}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                SAR
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-400 flex justify-between">
              <span>Available: {formatCurrency(availableBalance)}</span>
              {userCard?.cardNumber && (
                <button
                  onClick={() => setWithdrawAmount(availableBalance.toString())}
                  className="text-yellow-300 hover:text-yellow-300 transition-colors"
                >
                  Use Max
                </button>
              )}
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
                !userCard?.cardNumber ||
                !withdrawAmount ||
                parseFloat(withdrawAmount) <= 0 ||
                parseFloat(withdrawAmount) > availableBalance
              }
              className="flex-1 py-3 bg-gradient-to-r from-yellow-300 to-yellow-400 hover:to-yellow-700 rounded-xl font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-yellow-500/20"
            >
              {userCard?.cardNumber ? "Confirm Withdrawal" : "Add Card First"}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Add Card Modal Component
const AddCardModal = ({
  showAddCardModal,
  setShowAddCardModal,
  cardForm,
  setCardForm,
  showCVV,
  setShowCVV,
  handleAddCard,
  userData,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === "cardNumber") {
      const cleaned = value.replace(/\s/g, "").replace(/\D/g, "");
      let formatted = cleaned;
      if (cleaned.length > 4) formatted = cleaned.match(/.{1,4}/g).join(" ");
      if (formatted.length > 19) formatted = formatted.slice(0, 19);
      setCardForm({ ...cardForm, [name]: formatted });
      return;
    }
    
    // Format expiry month
    if (name === "expiryMonth") {
      const cleaned = value.replace(/\D/g, "");
      if (cleaned > 12) return; // Month can't be > 12
      if (cleaned.length > 2) return;
      setCardForm({ ...cardForm, [name]: cleaned });
      return;
    }
    
    // Format expiry year
    if (name === "expiryYear") {
      const cleaned = value.replace(/\D/g, "");
      if (cleaned.length > 2) return;
      setCardForm({ ...cardForm, [name]: cleaned });
      return;
    }
    
    // Format CVV
    if (name === "cvv") {
      const cleaned = value.replace(/\D/g, "");
      if (cleaned.length > 4) return;
      setCardForm({ ...cardForm, [name]: cleaned });
      return;
    }
    
    setCardForm({ ...cardForm, [name]: value });
  };

  // Pre-fill card holder name with user name
  React.useEffect(() => {
    if (!cardForm.cardHolder && userData.firstname && userData.lastname) {
      setCardForm(prev => ({
        ...prev,
        cardHolder: `${userData.firstname} ${userData.lastname}`.toUpperCase()
      }));
    }
  }, [userData, cardForm.cardHolder]);

  return (
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
                  {userData.card?.cardNumber ? "Update Card" : "Add Card"}
                </h2>
                <p className="text-gray-400 text-sm">Secure payment method</p>
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
                name="cardNumber"
                value={cardForm.cardNumber}
                onChange={handleInputChange}
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
                name="cardHolder"
                value={cardForm.cardHolder}
                onChange={handleInputChange}
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
                    name="expiryMonth"
                    value={cardForm.expiryMonth}
                    onChange={handleInputChange}
                    placeholder="MM"
                    className="w-full p-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    maxLength="2"
                  />
                  <input
                    type="text"
                    name="expiryYear"
                    value={cardForm.expiryYear}
                    onChange={handleInputChange}
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
                    type={showCVV[cardForm.cardNumber] ? "text" : "password"}
                    name="cvv"
                    value={cardForm.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    className="w-full p-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    maxLength="4"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowCVV({
                        ...showCVV,
                        [cardForm.cardNumber]: !showCVV[cardForm.cardNumber],
                      })
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showCVV[cardForm.cardNumber] ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
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
                disabled={
                  !cardForm.cardNumber ||
                  cardForm.cardNumber.replace(/\s/g, "").length < 16 ||
                  !cardForm.cardHolder ||
                  !cardForm.expiryMonth ||
                  !cardForm.expiryYear ||
                  !cardForm.cvv
                }
                className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {userData.card?.cardNumber ? "Update Card" : "Add Card"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Profile Modal Component remains the same as before...
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
                First Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.firstname}
                  onChange={(e) =>
                    setFormData({ ...formData, firstname: e.target.value })
                  }
                  className="w-full p-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              ) : (
                <div className="p-3 bg-gray-900/30 rounded-lg border border-gray-700/30">
                  <div className="font-bold text-white">
                    {userData.firstname}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-gray-400 mb-2 text-sm font-medium">
                Last Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.lastname}
                  onChange={(e) =>
                    setFormData({ ...formData, lastname: e.target.value })
                  }
                  className="w-full p-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              ) : (
                <div className="p-3 bg-gray-900/30 rounded-lg border border-gray-700/30">
                  <div className="font-bold text-white">
                    {userData.lastname}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-gray-400 mb-2 text-sm font-medium">
                Email
              </label>
              <div className="p-3 bg-gray-900/30 rounded-lg border border-gray-700/30">
                <div className="font-bold text-white">{userData.email}</div>
                <div className="text-xs text-gray-400 mt-1">
                  Email cannot be changed
                </div>
              </div>
            </div>

            <div>
              <label className="block text-gray-400 mb-2 text-sm font-medium">
                Country
              </label>
              {isEditing ? (
                <select
                  value={formData.billingAddress?.country || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      billingAddress: {
                        ...formData.billingAddress,
                        country: e.target.value,
                      },
                    })
                  }
                  className="w-full p-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                >
                  <option value="">Select Country</option>
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
                  <div className="font-bold text-white">
                    {userData.billingAddress?.country || "Not set"}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 mt-8 pt-6 border-t border-gray-700/30">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-semibold transition-all duration-300 border border-gray-700/50"
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Profile;
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import Header from "../components/Header.jsx";
import Hero from "../components/Hero";
import PartnersCarousel from "../components/Partners.jsx";
import HowItWorks from "../components/How.jsx";
import TeamIdentity from "../components/Team";

// Notification data
const transactions = [
  { type: "withdrawal", currency: "SAR", action: "withdrew" },
  { type: "conversion", currency: "USD", action: "converted" },
  { type: "gift_won", currency: "SAR", action: "won" },
];

const countries = [
  "Saudi Arabia",
  "United Arab Emirates",
  "Spain",
  "Portugal",
  "Brazil",
  "France",
  "Germany",
  "United Kingdom",
  "United States",
  "Egypt",
  "Morocco",
  "Tunisia",
  "Argentina",
  "Mexico",
  "Japan",
];

const names = [
  "Mohammed",
  "Ahmed",
  "Omar",
  "Ali",
  "Fahad",
  "Khaled",
  "Abdullah",
  "João",
  "Cristiano",
  "Luis",
  "Carlos",
  "James",
  "David",
  "Michael",
  "Sarah",
  "Fatima",
  "Maria",
  "Anna",
  "Yusuf",
  "Ibrahim",
];

const amounts = {
  SAR: [200, 500, 1000, 1500, 2000, 5000, 7500, 10000],
  USD: [50, 100, 200, 300, 500, 750, 1000],
};

// Gift items for won transactions
const gifts = [
  "signed jersey",
  "match tickets",
  "training session",
  "VIP experience",
  "team merchandise",
  "player meet & greet",
  "stadium tour",
];

function App() {
  const [countdown, setCountdown] = useState({
    days: 7,
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  // Function to generate random notification
  const generateNotification = () => {
    const name = names[Math.floor(Math.random() * names.length)];
    const country = countries[Math.floor(Math.random() * countries.length)];
    const transaction =
      transactions[Math.floor(Math.random() * transactions.length)];
    const amount =
      amounts[transaction.currency][
        Math.floor(Math.random() * amounts[transaction.currency].length)
      ];

    let message = "";
    let icon = "";

    switch (transaction.type) {
      case "withdrawal":
        message = `${name} from ${country} just ${transaction.action} ${transaction.currency} ${amount} to card`;
        icon = "💳";
        break;
      case "conversion":
        message = `${name} from ${country} just ${transaction.action} prize to ${transaction.currency} ${amount}`;
        icon = "💰";
        break;
      case "gift_won":
        const gift = gifts[Math.floor(Math.random() * gifts.length)];
        message = `${name} from ${country} just ${transaction.action} ${gift} worth ${transaction.currency} ${amount}`;
        icon = "🎁";
        break;
      default:
        message = `${name} from ${country} completed a transaction`;
        icon = "✅";
    }

    return { message, icon };
  };

  // Function to show toast notification
  const showRandomToast = () => {
    const { message, icon } = generateNotification();

    toast.custom(
      (t) => (
        <motion.div
          initial={{ opacity: 0, y: 50, x: 50 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 50, x: 50 }}
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-gradient-to-r from-blue-900/90 to-blue-800/90 backdrop-blur-sm shadow-lg rounded-2xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 border border-yellow-500/30`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 flex items-center justify-center">
                  <span className="text-xl">{icon}</span>
                </div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-white">Live Activity</p>
                <p className="mt-1 text-sm text-gray-300">{message}</p>
                <div className="mt-2 flex items-center">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                    Just now
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ),
      {
        duration: 8000,
        position: "bottom-right",
      },
    );
  };

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        const newSeconds = prev.seconds - 1;
        if (newSeconds < 0) {
          const newMinutes = prev.minutes - 1;
          if (newMinutes < 0) {
            const newHours = prev.hours - 1;
            if (newHours < 0) {
              const newDays = prev.days - 1;
              if (newDays < 0) {
                clearInterval(timer);
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
              }
              return { days: newDays, hours: 23, minutes: 59, seconds: 59 };
            }
            return { ...prev, hours: newHours, minutes: 59, seconds: 59 };
          }
          return { ...prev, minutes: newMinutes, seconds: 59 };
        }
        return { ...prev, seconds: newSeconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Notification effect - shows every 10 seconds
  useEffect(() => {
    // Show initial notification after 3 seconds
    const initialTimeout = setTimeout(() => {
      showRandomToast();
    }, 3000);

    // Set up interval for subsequent notifications
    const notificationInterval = setInterval(() => {
      showRandomToast();
    }, 20000); // Every 10 seconds

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(notificationInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 text-white">
      <Toaster
        containerStyle={{
          bottom: 20,
          right: 20,
        }}
        toastOptions={{
          className: "",
          style: {
            background: "transparent",
            color: "#fff",
            boxShadow: "none",
            padding: 0,
            margin: 0,
          },
        }}
      />

      <Header />
      <Hero />
      <HowItWorks />
      <PartnersCarousel />
      <TeamIdentity />
    </div>
  );
}

export default App;

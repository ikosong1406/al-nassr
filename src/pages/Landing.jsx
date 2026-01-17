import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import Header from "../components/Header.jsx";
import Hero from "../components/Hero";
import PartnersCarousel from "../components/Partners.jsx";
import HowItWorks from "../components/How.jsx";
import TeamIdentity from "../components/Team";
import Prizes from "../components/Prizes.jsx";
import FAQ from "../components/FAQ.jsx";
import CTA from "../components/CTA.jsx";
import Footer from "../components/Footer.jsx";

// Country-specific data with flags and appropriate names
const countryData = [
  {
    country: "Saudi Arabia",
    flag: "🇸🇦",
    names: [
      "Mohammed",
      "Ahmed",
      "Omar",
      "Ali",
      "Fahad",
      "Khaled",
      "Abdullah",
      "Yusuf",
      "Ibrahim",
      "Fatima",
    ],
    currency: "SAR",
  },
  {
    country: "United Arab Emirates",
    flag: "🇦🇪",
    names: [
      "Khalifa",
      "Rashid",
      "Saeed",
      "Majid",
      "Hamdan",
      "Zayed",
      "Mariam",
      "Shaikha",
    ],
    currency: "AED",
  },
  {
    country: "Spain",
    flag: "🇪🇸",
    names: [
      "Juan",
      "Carlos",
      "José",
      "Miguel",
      "Antonio",
      "Francisco",
      "María",
      "Carmen",
      "Ana",
      "Isabel",
    ],
    currency: "EUR",
  },
  {
    country: "Portugal",
    flag: "🇵🇹",
    names: [
      "João",
      "José",
      "António",
      "Manuel",
      "Francisco",
      "Luís",
      "Maria",
      "Ana",
      "Teresa",
    ],
    currency: "EUR",
  },
  {
    country: "Brazil",
    flag: "🇧🇷",
    names: [
      "João",
      "Pedro",
      "Lucas",
      "Gabriel",
      "Matheus",
      "Rafael",
      "Maria",
      "Ana",
      "Julia",
      "Beatriz",
    ],
    currency: "BRL",
  },
  {
    country: "France",
    flag: "🇫🇷",
    names: [
      "Pierre",
      "Jean",
      "Paul",
      "Louis",
      "Thomas",
      "Marie",
      "Sophie",
      "Julie",
      "Camille",
    ],
    currency: "EUR",
  },
  {
    country: "Germany",
    flag: "🇩🇪",
    names: [
      "Hans",
      "Peter",
      "Klaus",
      "Thomas",
      "Michael",
      "Heinz",
      "Anna",
      "Maria",
      "Sabine",
      "Ursula",
    ],
    currency: "EUR",
  },
  {
    country: "United Kingdom",
    flag: "🇬🇧",
    names: [
      "James",
      "John",
      "David",
      "Michael",
      "William",
      "Emma",
      "Olivia",
      "Sophia",
      "Isabella",
    ],
    currency: "GBP",
  },
  {
    country: "United States",
    flag: "🇺🇸",
    names: [
      "James",
      "John",
      "Robert",
      "Michael",
      "William",
      "Jennifer",
      "Lisa",
      "Mary",
      "Patricia",
    ],
    currency: "USD",
  },
  {
    country: "Egypt",
    flag: "🇪🇬",
    names: [
      "Mohamed",
      "Ahmed",
      "Mahmoud",
      "Khaled",
      "Omar",
      "Fatima",
      "Aisha",
      "Mona",
      "Noura",
    ],
    currency: "EGP",
  },
  {
    country: "Morocco",
    flag: "🇲🇦",
    names: [
      "Youssef",
      "Mohamed",
      "Ahmed",
      "Karim",
      "Hassan",
      "Fatima",
      "Zahra",
      "Amina",
      "Samira",
    ],
    currency: "MAD",
  },
  {
    country: "Argentina",
    flag: "🇦🇷",
    names: [
      "Juan",
      "Carlos",
      "José",
      "Martín",
      "Diego",
      "María",
      "Lucía",
      "Carla",
      "Ana",
    ],
    currency: "ARS",
  },
  {
    country: "Mexico",
    flag: "🇲🇽",
    names: [
      "Juan",
      "José",
      "Carlos",
      "Miguel",
      "Jesús",
      "María",
      "Guadalupe",
      "Rosa",
      "Carmen",
    ],
    currency: "MXN",
  },
  {
    country: "Japan",
    flag: "🇯🇵",
    names: [
      "Yuto",
      "Haruto",
      "Sota",
      "Yuki",
      "Kaito",
      "Sakura",
      "Yui",
      "Hina",
      "Rin",
    ],
    currency: "JPY",
  },
];

const transactions = [
  { type: "withdrawal", action: "withdrew", suffix: "to card" },
  { type: "conversion", action: "converted", suffix: "to cash" },
  { type: "gift_won", action: "won", suffix: "prize" },
];

// Currency amounts based on country economy
const amountRanges = {
  SAR: [200, 500, 1000, 1500, 2000, 5000, 7500, 10000],
  USD: [50, 100, 200, 300, 500, 750, 1000],
  EUR: [50, 100, 200, 300, 500, 750, 1000],
  GBP: [50, 100, 200, 300, 500, 750, 1000],
  AED: [200, 500, 1000, 2000, 3000, 5000],
  BRL: [300, 800, 1500, 2500, 4000, 6000],
  EGP: [1000, 3000, 5000, 8000, 12000, 20000],
  MAD: [500, 1500, 3000, 5000, 8000, 12000],
  ARS: [10000, 30000, 50000, 80000, 120000, 200000],
  MXN: [500, 1500, 3000, 5000, 8000, 12000],
  JPY: [5000, 10000, 20000, 30000, 50000, 80000],
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

// Function to get random amount based on currency
const getRandomAmount = (currency) => {
  const range = amountRanges[currency] || amountRanges.SAR;
  return range[Math.floor(Math.random() * range.length)];
};

function App() {
  const [countdown, setCountdown] = useState({
    days: 7,
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  // Function to generate random notification with country-specific data
  const generateNotification = () => {
    const countryObj =
      countryData[Math.floor(Math.random() * countryData.length)];
    const name =
      countryObj.names[Math.floor(Math.random() * countryObj.names.length)];
    const transaction =
      transactions[Math.floor(Math.random() * transactions.length)];
    const amount = getRandomAmount(countryObj.currency);

    let message = "";
    let icon = "";

    switch (transaction.type) {
      case "withdrawal":
        message = `${name} from ${countryObj.country} ${countryObj.flag} just ${transaction.action} ${countryObj.currency} ${amount} ${transaction.suffix}`;
        icon = "💳";
        break;
      case "conversion":
        message = `${name} from ${countryObj.country} ${countryObj.flag} just ${transaction.action} prize to ${countryObj.currency} ${amount}`;
        icon = "💰";
        break;
      case "gift_won":
        const gift = gifts[Math.floor(Math.random() * gifts.length)];
        message = `${name} from ${countryObj.country} ${countryObj.flag} just ${transaction.action} ${gift} worth ${countryObj.currency} ${amount}`;
        icon = "🎁";
        break;
      default:
        message = `${name} from ${countryObj.country} ${countryObj.flag} completed a transaction`;
        icon = "✅";
    }

    return {
      message,
      icon,
      country: countryObj.country,
      flag: countryObj.flag,
    };
  };

  // Function to show toast notification
  const showRandomToast = () => {
    const { message, icon, country, flag } = generateNotification();

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
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 flex items-center justify-center">
                  <span className="text-2xl">{icon}</span>
                </div>
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-white">
                    Live Activity
                  </p>
                  <span className="text-xl">{flag}</span>
                </div>
                <p className="mt-2 text-sm text-gray-300 leading-relaxed">
                  {message}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                    Just now
                  </span>
                  <span className="text-xs text-gray-400">{country}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-12 h-full border-l border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-500/10 transition-colors rounded-r-2xl"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      ),
      {
        duration: 10000,
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
    }, 20000); // Every 20 seconds

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(notificationInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-yellow-400 text-white">
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
      <Prizes />
      <FAQ />
      <CTA countdown={countdown} />
      <Footer />
    </div>
  );
}

export default App;

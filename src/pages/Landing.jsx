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
      "Hassan",
      "Khalid",
      "Nasser",
      "Saleh",
      "Turki",
      "Bandar",
      "Rashid",
      "Saad",
      "Sultan",
      "Majid",
      "Mansour",
      "Noura",
      "Layla",
      "Aisha",
      "Maha",
      "Reem",
      "Sarah",
      "Dalal",
      "Hala",
      "Wafa",
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
      "Mohammed",
      "Ahmed",
      "Ali",
      "Omar",
      "Sultan",
      "Abdullah",
      "Hussain",
      "Khalid",
      "Fatima",
      "Aisha",
      "Salama",
      "Noura",
      "Layla",
      "Maitha",
      "Shamma",
      "Alia",
      "Hessa",
      "Mozah",
      "Salem",
      "Naser",
      "Jassim",
      "Saud",
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
      "Luis",
      "Manuel",
      "Javier",
      "Francisco",
      "David",
      "Daniel",
      "Pablo",
      "Álvaro",
      "Diego",
      "Sergio",
      "Laura",
      "Lucía",
      "Marta",
      "Paula",
      "Elena",
      "Cristina",
      "Sara",
      "Raquel",
      "Beatriz",
      "Teresa",
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
      "Carlos",
      "Pedro",
      "Miguel",
      "Rui",
      "Paulo",
      "Fernando",
      "Nuno",
      "Ricardo",
      "Bruno",
      "Diogo",
      "Catarina",
      "Inês",
      "Sofia",
      "Beatriz",
      "Marta",
      "Rita",
      "Carla",
      "Diana",
      "Joana",
      "Sara",
      "Helena",
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
      "Guilherme",
      "Enzo",
      "Felipe",
      "Leonardo",
      "Arthur",
      "Murilo",
      "Vinicius",
      "Thiago",
      "Marcos",
      "Isabella",
      "Laura",
      "Luiza",
      "Manuela",
      "Sophia",
      "Valentina",
      "Larissa",
      "Fernanda",
      "Amanda",
      "Carolina",
      "Clara",
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
      "Jacques",
      "Michel",
      "Philippe",
      "Alain",
      "Bernard",
      "Claude",
      "Nicolas",
      "François",
      "Eric",
      "David",
      "Isabelle",
      "Catherine",
      "Nathalie",
      "Valérie",
      "Martine",
      "Christine",
      "Chloé",
      "Emma",
      "Léa",
      "Sarah",
      "Laura",
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
      "Wolfgang",
      "Werner",
      "Günter",
      "Horst",
      "Jürgen",
      "Dieter",
      "Andreas",
      "Christian",
      "Stefan",
      "Markus",
      "Petra",
      "Monika",
      "Susanne",
      "Karin",
      "Andrea",
      "Brigitte",
      "Claudia",
      "Elisabeth",
      "Gabriele",
      "Hannah",
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
      "Robert",
      "Richard",
      "Charles",
      "Joseph",
      "Thomas",
      "Daniel",
      "Matthew",
      "Andrew",
      "Edward",
      "Amelia",
      "Ava",
      "Mia",
      "Evelyn",
      "Charlotte",
      "Harper",
      "Emily",
      "Abigail",
      "Elizabeth",
      "Grace",
      "Chloe",
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
      "David",
      "Richard",
      "Joseph",
      "Thomas",
      "Charles",
      "Christopher",
      "Daniel",
      "Matthew",
      "Anthony",
      "Susan",
      "Linda",
      "Karen",
      "Nancy",
      "Betty",
      "Sandra",
      "Margaret",
      "Sharon",
      "Jessica",
      "Sarah",
      "Ashley",
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
      "Hassan",
      "Ibrahim",
      "Youssef",
      "Mostafa",
      "Tarek",
      "Karim",
      "Wael",
      "Hany",
      "Sherif",
      "Ashraf",
      "Nadia",
      "Samira",
      "Hala",
      "Rania",
      "Mai",
      "Yasmin",
      "Dalia",
      "Sara",
      "Marwa",
      "Amira",
      "Salma",
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
      "Omar",
      "Bilal",
      "Mehdi",
      "Rachid",
      "Jamal",
      "Nabil",
      "Said",
      "Adil",
      "Mustapha",
      "Hamza",
      "Khadija",
      "Latifa",
      "Hayat",
      "Naima",
      "Malika",
      "Rkia",
      "Halima",
      "Sanaa",
      "Hanane",
      "Nadia",
      "Leila",
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
      "Luis",
      "Pablo",
      "Santiago",
      "Matías",
      "Sebastián",
      "Javier",
      "Alejandro",
      "Gonzalo",
      "Fernando",
      "Ricardo",
      "Valentina",
      "Sofía",
      "Camila",
      "Victoria",
      "Julieta",
      "Romina",
      "Daniela",
      "Florencia",
      "Agustina",
      "Gabriela",
      "Carolina",
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
      "Francisco",
      "Antonio",
      "Jorge",
      "Luis",
      "Manuel",
      "Pedro",
      "Alejandro",
      "Roberto",
      "Fernando",
      "Eduardo",
      "Ana",
      "Patricia",
      "Verónica",
      "Elizabeth",
      "Gabriela",
      "Leticia",
      "Adriana",
      "Silvia",
      "Isabel",
      "Diana",
      "Laura",
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
      "Ren",
      "Sho",
      "Riku",
      "Haruki",
      "Kai",
      "Daiki",
      "Ryota",
      "Takumi",
      "Kenta",
      "Shun",
      "Mei",
      "Aoi",
      "Yuna",
      "Miyu",
      "Mao",
      "Koharu",
      "Miu",
      "Riko",
      "Honoka",
      "Akari",
      "Asuka",
    ],
    currency: "JPY",
  },
  {
    country: "Italy",
    flag: "🇮🇹",
    names: [
      "Giuseppe",
      "Giovanni",
      "Antonio",
      "Mario",
      "Luigi",
      "Francesco",
      "Maria",
      "Anna",
      "Giulia",
      "Marco",
      "Alessandro",
      "Lorenzo",
      "Mattia",
      "Andrea",
      "Riccardo",
      "Davide",
      "Fabio",
      "Roberto",
      "Paolo",
      "Sofia",
      "Aurora",
      "Ginevra",
      "Beatrice",
      "Martina",
      "Gaia",
      "Giorgia",
      "Elena",
      "Chiara",
      "Valentina",
      "Alice",
    ],
    currency: "EUR",
  },
  {
    country: "South Korea",
    flag: "🇰🇷",
    names: [
      "Min-jun",
      "Seo-joon",
      "Ji-ho",
      "Do-yoon",
      "Jae-hyun",
      "Soo-min",
      "Ji-woo",
      "Seo-yeon",
      "Ha-yoon",
      "Jun-seo",
      "Hyun-woo",
      "Seung-min",
      "Tae-hyun",
      "Woo-jin",
      "Joon-ho",
      "Sang-hyun",
      "Young-min",
      "Ki-tae",
      "Yeon-woo",
      "Ji-hye",
      "Min-seo",
      "Yoo-jin",
      "Da-bin",
      "Seo-hyun",
      "Na-young",
      "Hye-rim",
      "Ji-eun",
      "Soo-jin",
      "Eun-ji",
      "Bo-mi",
    ],
    currency: "KRW",
  },
  {
    country: "India",
    flag: "🇮🇳",
    names: [
      "Aarav",
      "Vihaan",
      "Advik",
      "Dhruv",
      "Krishna",
      "Arjun",
      "Rohan",
      "Raj",
      "Aryan",
      "Vivaan",
      "Sai",
      "Ishaan",
      "Reyansh",
      "Kabir",
      "Atharv",
      "Rudra",
      "Virat",
      "Surya",
      "Dev",
      "Aadhya",
      "Anaya",
      "Diya",
      "Ira",
      "Myra",
      "Sara",
      "Kiara",
      "Pari",
      "Riya",
      "Zara",
      "Ishita",
    ],
    currency: "INR",
  },
  {
    country: "China",
    flag: "🇨🇳",
    names: [
      "Wei",
      "Ming",
      "Lei",
      "Feng",
      "Jie",
      "Li",
      "Jing",
      "Mei",
      "Fang",
      "Xia",
      "Zhang",
      "Wang",
      "Liu",
      "Chen",
      "Yang",
      "Zhao",
      "Huang",
      "Zhou",
      "Wu",
      "Xu",
      "Lin",
      "Sun",
      "Ma",
      "Gao",
      "Hu",
      "Tang",
      "Zheng",
      "Cai",
      "Peng",
      "Cheng",
    ],
    currency: "CNY",
  },
];

const transactions = [
  { type: "withdrawal", action: "withdrew", suffix: "to card" },
  { type: "conversion", action: "converted", suffix: "to cash" },
  { type: "gift_won", action: "won", suffix: "prize" },
];

// Currency amounts based on country economy
const amountRanges = {
  // High-value currencies (used in wealthy regions)
  SAR: [5000, 10000, 25000, 50000, 100000, 250000, 500000, 1000000],
  AED: [5000, 10000, 25000, 50000, 100000, 250000, 500000, 1000000],
  USD: [1000, 5000, 10000, 25000, 50000, 100000, 250000, 500000],
  EUR: [1000, 5000, 10000, 25000, 50000, 100000, 250000, 500000],
  GBP: [1000, 5000, 10000, 25000, 50000, 100000, 250000, 500000],
  
  // Major currencies with significant value
  JPY: [500000, 1000000, 2000000, 5000000, 10000000, 20000000, 50000000],
  CNY: [5000, 10000, 50000, 100000, 500000, 1000000, 2000000, 5000000],
  KRW: [5000000, 10000000, 50000000, 100000000, 200000000, 500000000],
  
  // Emerging market currencies
  BRL: [5000, 10000, 25000, 50000, 100000, 250000, 500000, 1000000],
  INR: [50000, 100000, 250000, 500000, 1000000, 2500000, 5000000],
  
  // Regional currencies
  EGP: [50000, 100000, 250000, 500000, 1000000, 2500000, 5000000, 10000000],
  MAD: [50000, 100000, 250000, 500000, 1000000, 2500000, 5000000],
  MXN: [50000, 100000, 250000, 500000, 1000000, 2500000, 5000000],
  ARS: [500000, 1000000, 5000000, 10000000, 50000000, 100000000, 500000000]
};

// Gift items for won transactions
const gifts = [
  "Omega Speedmaster / Seamaster Watch Vault",
  "Rolex Professional Series Watch Vault",
  "Cartier / Bulgari High-Jewelry Set",
  "Signed Match-Worn Double Jersey Vault",
  "Al-Nassr Gold Edition Memorabilia Chest",
  "Cristiano Ronaldo Signed Career Milestone Frame",
  "Apple Ultra Tech Vault",
  "Bang & Olufsen Home Audio Vault",
  "Leica Master Photography Vault",
  "Luxury Driving Experience & Gear Vault",
  "Premium E-Bike / Performance Scooter Vault",
  "VIP Match Travel Asset Package",
  "Five-Star Hospitality Credit Vault",
  "Luxury Fashion Trunk (Louis Vuitton / Dior / Hermès)",
  "Contemporary Art & Football Culture Vault",
  "Professional Home Gym Vault (Technogym / Peloton Pro)",
  "Football Performance Analysis Vault",
  "Professional Content Creator Studio Vault",
  "Broadcast-Grade Podcast & Streaming Vault",
  "Italian Designer Furniture Vault",
  "Smart Luxury Home Office Vault",
  "High-End Motorcycle Vault (Ducati / BMW M)",
  "Luxury Car Customization Credit Vault",
  "Elite Football Education Vault",
  "Executive Education & Business Accelerator Vault",
  "Luxury Cruise Experience Asset Vault",
  "Formula 1 VIP Weekend Asset Package",
  "Limited Edition Football Art Vault",
  "Luxury Timepiece Customization Vault",
  "Global Football Memorabilia Mega-Chest",
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
                <p className="mt-2 text-sm text-gray-300 leading-relaxed">
                  {message}
                </p>
              </div>
            </div>
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

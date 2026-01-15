import React, { useEffect, useState } from "react";
import TradingViewWidget from "./TradingViewWidget";
import { Toaster, toast } from "react-hot-toast";
// import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const Home = () => {
  const [username] = useState("John Trader");
  const [balance, setBalance] = useState(12456.78);
  const [todayPL, setTodayPL] = useState(245.67);
  const [percentageGain] = useState(2.01);
  const [trades] = useState([
    {
      id: 1,
      pair: "EUR/USD",
      type: "BUY",
      lotSize: 1.0,
      openPrice: 1.085,
      currentPrice: 1.0875,
      profit: 250,
      status: "open",
    },
    {
      id: 2,
      pair: "GBP/JPY",
      type: "SELL",
      lotSize: 0.5,
      openPrice: 183.5,
      currentPrice: 183.2,
      profit: 150,
      status: "open",
    },
    {
      id: 3,
      pair: "USD/JPY",
      type: "BUY",
      lotSize: 1.5,
      openPrice: 149.8,
      currentPrice: 150.1,
      profit: 450,
      status: "open",
    },
    {
      id: 4,
      pair: "AUD/USD",
      type: "SELL",
      lotSize: 1.0,
      openPrice: 0.656,
      currentPrice: 0.6545,
      profit: 150,
      status: "open",
    },
  ]);

  // Doughnut chart data
  const portfolioData = [
    { name: "EUR/USD", value: 35, color: "#3B82F6" },
    { name: "GBP/JPY", value: 25, color: "#10B981" },
    { name: "USD/JPY", value: 20, color: "#F59E0B" },
    { name: "AUD/USD", value: 15, color: "#EF4444" },
    { name: "Others", value: 5, color: "#8B5CF6" },
  ];

  // Function to show profit toast
  const showProfitToast = () => {
    const pairs = [
      "EUR/USD",
      "GBP/JPY",
      "USD/JPY",
      "AUD/USD",
      "USD/CAD",
      "NZD/USD",
    ];
    const randomPair = pairs[Math.floor(Math.random() * pairs.length)];
    const profit = (Math.random() * 200 + 50).toFixed(2);

    toast.success(
      <div>
        <p className="font-semibold">💰 Profit Alert!</p>
        <p className="text-sm">
          {randomPair}: +${profit}
        </p>
      </div>,
      {
        duration: 4000,
        position: "bottom-left",
        style: {
          background: "#1F2937",
          color: "#fff",
          border: "1px solid #374151",
        },
      }
    );
  };

  // Set up interval for profit notifications
  useEffect(() => {
    const interval = setInterval(showProfitToast, 60000); // Every 1 minute
    return () => clearInterval(interval);
  }, []);

  const handleWithdraw = () => {
    toast.success("Withdrawal request submitted successfully!");
  };

  const totalProfit = trades.reduce((sum, trade) => sum + trade.profit, 0);
  const openTrades = trades.filter((trade) => trade.status === "open").length;

  return (
    <>
      <div className="space-y-6 min-h-screen text-white p-4 md:p-6">
        {/* Header with greeting and withdraw button */}
        <div className="flex md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Hi, {username}</h1>
          </div>
          <button
            onClick={handleWithdraw}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            Withdraw
          </button>
        </div>

        {/* Balance with percentage gain */}
        <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-6 border border-gray-800 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-3">
                <p className="text-4xl md:text-5xl font-bold">
                  $
                  {balance.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </p>
                <div className="flex items-center gap-1 bg-green-900/30 text-green-400 px-3 py-1 rounded-full">
                  <span className="font-bold">+{percentageGain}%</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-green-400 text-lg font-semibold mt-2">
                Today's P/L:{" "}
                <span className="ml-2">+${todayPL.toFixed(2)}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* TradingView Widget - Full width on mobile, 2/3 on desktop */}
          <div className="lg:col-span-2">
            <div className="h-[500px]">
              <div className="h-[calc(100%-3rem)]">
                <TradingViewWidget />
              </div>
            </div>
          </div>
        </div>

        {/* Trades Summary Table */}
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Open Trades Summary</h3>
            <span className="text-sm text-gray-400">
              {trades.length} active trades
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-800">
                  <th className="pb-3 px-4">Currency Pair</th>
                  <th className="pb-3 px-4">Type</th>
                  <th className="pb-3 px-4">Lot Size</th>
                  <th className="pb-3 px-4">Open Price</th>
                  <th className="pb-3 px-4">Current Price</th>
                  <th className="pb-3 px-4">Profit/Loss</th>
                  <th className="pb-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {trades.map((trade) => (
                  <tr
                    key={trade.id}
                    className="border-b border-gray-800/50 hover:bg-gray-800/30"
                  >
                    <td className="py-4 px-4 font-semibold">{trade.pair}</td>
                    <td
                      className={`py-4 px-4 font-semibold ${
                        trade.type === "BUY" ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {trade.type}
                    </td>
                    <td className="py-4 px-4">{trade.lotSize}</td>
                    <td className="py-4 px-4">{trade.openPrice}</td>
                    <td className="py-4 px-4">{trade.currentPrice}</td>
                    <td
                      className={`py-4 px-4 font-bold ${
                        trade.profit >= 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      ${trade.profit}
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-900/30 text-green-400">
                        ● {trade.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-800 flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-sm">Total Exposure</p>
              <p className="text-xl font-bold">$4,500.00</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Margin Used</p>
              <p className="text-xl font-bold">$1,125.00</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Free Margin</p>
              <p className="text-xl font-bold text-green-400">$11,331.78</p>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <Toaster
        position="bottom-left"
        containerStyle={{
          bottom: 20,
          left: 20,
        }}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#1F2937",
            color: "#fff",
            border: "1px solid #374151",
            borderRadius: "12px",
            padding: "16px",
            maxWidth: "400px",
          },
        }}
      />
    </>
  );
};

export default Home;

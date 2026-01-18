const Profile = () => (
  <div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-6"
  >
    <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="text-left border-b border-gray-200 dark:border-gray-700">
              <th className="pb-4 font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wider">
                Currency Pair
              </th>
              <th className="pb-4 font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wider">
                P/L
              </th>
              <th className="pb-4 font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wider">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {[
              {
                pair: "EUR/USD",
                pnl: "+$428.50",
                time: "Today, 10:30 AM",
                change: "+2.14%",
              },
              {
                pair: "GBP/JPY",
                pnl: "-$185.20",
                time: "Today, 09:15 AM",
                change: "-0.92%",
              },
              {
                pair: "USD/JPY",
                pnl: "+$312.75",
                time: "Yesterday, 14:45",
                change: "+1.56%",
              },
              {
                pair: "AUD/USD",
                pnl: "+$89.30",
                time: "Dec 12, 2024",
                change: "+0.45%",
              },
              {
                pair: "USD/CAD",
                pnl: "+$567.80",
                time: "Dec 11, 2024",
                change: "+2.84%",
              },
              {
                pair: "NZD/USD",
                pnl: "-$124.60",
                time: "Dec 10, 2024",
                change: "-0.62%",
              },
              {
                pair: "EUR/GBP",
                pnl: "+$276.40",
                time: "Dec 9, 2024",
                status: "Pending",
                change: "+1.38%",
              },
            ].map((trade, i) => (
              <tr
                key={i}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group"
              >
                <td className="py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">
                        {trade.pair.split("/")[0].charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {trade.pair}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Forex
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex items-center">
                    <div
                      className={`text-lg font-semibold ${
                        trade.pnl.startsWith("+")
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {trade.pnl}
                    </div>
                    <div
                      className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${
                        trade.pnl.startsWith("+")
                          ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                          : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                      }`}
                    >
                      {trade.change}
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <div className="text-gray-700 dark:text-gray-300">
                    {trade.time}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {[
          {
            pair: "EUR/USD",
            pnl: "+$428.50",
            time: "Today, 10:30 AM",
            change: "+2.14%",
          },
          {
            pair: "GBP/JPY",
            pnl: "-$185.20",
            time: "Today, 09:15 AM",
            change: "-0.92%",
          },
          {
            pair: "USD/JPY",
            pnl: "+$312.75",
            time: "Yesterday, 14:45",
            change: "+1.56%",
          },
          {
            pair: "AUD/USD",
            pnl: "+$89.30",
            time: "Dec 12, 2024",
            change: "+0.45%",
          },
        ].map((trade, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xs">
                    {trade.pair.split("/")[0].charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {trade.pair}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Forex
                  </div>
                </div>
              </div>
              <div
                className={`text-right font-semibold ${
                  trade.pnl.startsWith("+")
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {trade.pnl}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-600 dark:text-gray-400 text-xs">
                  Time
                </div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {trade.time}
                </div>
              </div>
              <div className="text-right">
                <div className="text-gray-600 dark:text-gray-400 text-xs">
                  Change
                </div>
                <div
                  className={`font-medium ${
                    trade.pnl.startsWith("+")
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {trade.change}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Profile;

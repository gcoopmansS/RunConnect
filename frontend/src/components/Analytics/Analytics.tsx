import React from "react";

const analyticsData = [
  { id: 1, label: "Total Workouts", value: 42, icon: "🏃" },
  { id: 2, label: "Active Athletes", value: 12, icon: "💪" },
  { id: 3, label: "Avg. Weekly Distance", value: "38 km", icon: "📏" },
  { id: 4, label: "Best Streak", value: "7 days", icon: "🔥" },
];

const Analytics: React.FC = () => {
  return (
    <div className="p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">
        Analytics
      </h2>
      <p className="text-gray-600 text-lg mb-6">
        Track your team's performance and key metrics at a glance.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {analyticsData.map((stat) => (
          <div
            key={stat.id}
            className="flex flex-col items-center bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl shadow p-6"
          >
            <span className="text-4xl mb-2">{stat.icon}</span>
            <span className="text-2xl font-bold text-teal-700 mb-1">
              {stat.value}
            </span>
            <span className="text-gray-500 text-sm font-medium">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-xl font-semibold text-teal-700 mb-4">
          Weekly Activity (Demo)
        </h3>
        <div className="w-full h-32 flex items-end gap-2">
          {[12, 18, 10, 22, 15, 30, 25].map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center">
              <div
                className="w-6 bg-gradient-to-t from-cyan-400 to-teal-500 rounded-t-xl"
                style={{ height: `${val * 3}px` }}
              ></div>
              <span className="text-xs text-gray-400 mt-1">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;

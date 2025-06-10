import React from "react";
import AthleteCard from "../Athletes/AthleteCard";
import { Athlete } from "../../types/athlete";

const athletes: Athlete[] = [
  {
    id: 1,
    name: "Alice Smith",
    email: "alice@example.com",
    status: "Active",
    weeklyDistance: 38,
    events: [
      { id: 1, title: "Long Run", date: "2025-06-12", athlete: "Alice Smith" },
      { id: 4, title: "Tempo Run", date: "2025-06-15", athlete: "Alice Smith" },
    ],
  },
  {
    id: 2,
    name: "Bob Johnson",
    email: "bob@example.com",
    status: "Invited",
    weeklyDistance: 22,
    events: [
      {
        id: 2,
        title: "Interval Training",
        date: "2025-06-13",
        athlete: "Bob Johnson",
      },
    ],
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    status: "Active",
    weeklyDistance: 30,
    events: [
      {
        id: 3,
        title: "Recovery Day",
        date: "2025-06-14",
        athlete: "Charlie Brown",
      },
    ],
  },
];

const CoachDashboard: React.FC = () => {
  return (
    <div className="p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
        Dashboard
      </h2>
      <p className="text-gray-600 text-lg mb-6">
        Welcome! Here are your athletes:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {athletes.map((athlete) => (
          <AthleteCard key={athlete.id} athlete={athlete} onSelect={() => {}} />
        ))}
      </div>
    </div>
  );
};

export default CoachDashboard;

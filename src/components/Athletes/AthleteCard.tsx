import React from "react";
import { Athlete } from "../../types/athlete";

interface AthleteCardProps {
  athlete: Athlete;
  onSelect: (id: number) => void;
}

const AthleteCard: React.FC<AthleteCardProps> = ({ athlete, onSelect }) => (
  <button
    className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow p-6 flex flex-col items-start hover:scale-105 transition border-2 border-transparent hover:border-green-400"
    onClick={() => onSelect(athlete.id)}
  >
    <div className="flex items-center gap-3 mb-2">
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg">
        {athlete.name
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </div>
      <span className="text-lg font-semibold text-gray-800 group-hover:text-green-700 transition">
        {athlete.name}
      </span>
    </div>
    <div className="text-gray-500 text-sm mb-2">{athlete.email}</div>
    <span
      className={`px-3 py-1 rounded-full text-xs font-bold ${
        athlete.status === "Active"
          ? "bg-green-100 text-green-700"
          : "bg-yellow-100 text-yellow-700"
      }`}
    >
      {athlete.status}
    </span>
  </button>
);

export default AthleteCard;

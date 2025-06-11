import React, { useState } from "react";

const events = [
  { id: 1, title: "Long Run", date: "2025-06-12", athlete: "Alice Smith" },
  {
    id: 2,
    title: "Interval Training",
    date: "2025-06-13",
    athlete: "Bob Johnson",
  },
  {
    id: 3,
    title: "Recovery Day",
    date: "2025-06-14",
    athlete: "Charlie Brown",
  },
];

function getWeekDates(startDate: Date) {
  const week = [];
  const start = new Date(startDate);
  start.setDate(start.getDate() - start.getDay()); // Sunday
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    week.push(d);
  }
  return week;
}

const Schedule: React.FC = () => {
  const [view, setView] = useState<"list" | "calendar">("list");
  const [weekStart, setWeekStart] = useState(() => {
    const now = new Date();
    now.setDate(now.getDate() - now.getDay());
    return now;
  });

  const weekDates = getWeekDates(weekStart);

  return (
    <div className="p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
          Schedule
        </h2>
        <div className="flex items-center gap-2">
          <span
            className={`text-sm font-medium ${
              view === "list" ? "text-purple-700" : "text-gray-400"
            }`}
          >
            List
          </span>
          <button
            className={`relative w-14 h-8 bg-purple-100 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400`}
            onClick={() => setView(view === "list" ? "calendar" : "list")}
            aria-label={
              view === "list" ? "Switch to week view" : "Switch to list view"
            }
            type="button"
          >
            <span
              className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 shadow transform transition-transform duration-300 ${
                view === "calendar" ? "translate-x-6" : ""
              }`}
            />
          </button>
          <span
            className={`text-sm font-medium ${
              view === "calendar" ? "text-purple-700" : "text-gray-400"
            }`}
          >
            Week
          </span>
        </div>
      </div>
      <p className="text-gray-600 text-lg mb-6">
        View and manage upcoming workouts and events for your athletes.
      </p>
      {view === "list" ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Athlete
                </th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-purple-50/50 transition">
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-800">
                    {event.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {event.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {event.athlete}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="flex items-center mb-2 gap-2">
            <button
              className="px-2 py-1 rounded bg-purple-100 text-purple-700 font-bold"
              onClick={() =>
                setWeekStart(
                  new Date(weekStart.getTime() - 7 * 24 * 60 * 60 * 1000)
                )
              }
            >
              &lt;
            </button>
            <span className="font-semibold text-purple-700">
              Week of {weekDates[0].toLocaleDateString()}
            </span>
            <button
              className="px-2 py-1 rounded bg-purple-100 text-purple-700 font-bold"
              onClick={() =>
                setWeekStart(
                  new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000)
                )
              }
            >
              &gt;
            </button>
          </div>
          <table className="min-w-full bg-white rounded-xl shadow">
            <thead>
              <tr>
                {weekDates.map((date) => (
                  <th
                    key={date.toISOString()}
                    className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {date.toLocaleDateString(undefined, {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {weekDates.map((date) => {
                  const dayEvents = events.filter(
                    (e) => e.date === date.toISOString().slice(0, 10)
                  );
                  return (
                    <td
                      key={date.toISOString()}
                      className="align-top px-4 py-3 min-w-[120px]"
                    >
                      {dayEvents.length === 0 ? (
                        <span className="text-gray-300 text-xs">No events</span>
                      ) : (
                        dayEvents.map((ev) => (
                          <div
                            key={ev.id}
                            className="mb-2 p-2 rounded bg-purple-50 text-purple-800 font-semibold shadow-sm"
                          >
                            <div>{ev.title}</div>
                            <div className="text-xs text-gray-500">
                              {ev.athlete}
                            </div>
                          </div>
                        ))
                      )}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <button className="mt-6 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold shadow hover:scale-105 transition">
        Add Event
      </button>
    </div>
  );
};

export default Schedule;

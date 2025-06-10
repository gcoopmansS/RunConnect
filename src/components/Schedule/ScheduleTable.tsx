import React from "react";
import { WorkoutEvent } from "../../types/athlete";
import { getWeekDates } from "../../utils/date";

interface ScheduleTableProps {
  weekStart: Date;
  events: WorkoutEvent[];
  onAdd: (date: string) => void;
  onEdit: (event: WorkoutEvent) => void;
}

const ScheduleTable: React.FC<ScheduleTableProps> = ({
  weekStart,
  events,
  onAdd,
  onEdit,
}) => {
  const weekDates = getWeekDates(weekStart);
  return (
    <table className="min-w-full bg-white rounded-xl shadow">
      <thead>
        <tr>
          {weekDates.map((date) => (
            <th
              key={date.toISOString()}
              className="px-2 py-1 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {date.toLocaleDateString(undefined, {
                weekday: "short",
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
                className="align-top px-2 py-2 min-w-[80px]"
              >
                {dayEvents.length === 0 ? (
                  <button
                    className="text-xs text-green-400 hover:underline"
                    onClick={() => onAdd(date.toISOString().slice(0, 10))}
                  >
                    + Add
                  </button>
                ) : (
                  dayEvents.map((ev) => (
                    <div
                      key={ev.id}
                      className="mb-2 p-2 rounded bg-green-50 text-green-800 font-semibold shadow-sm flex items-center gap-2"
                    >
                      <span>{ev.title}</span>
                      <button
                        className="ml-auto text-xs text-green-500 hover:underline"
                        onClick={() => onEdit(ev)}
                      >
                        Edit
                      </button>
                    </div>
                  ))
                )}
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
};

export default ScheduleTable;

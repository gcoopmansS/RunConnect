import React from "react";

const exercises = [
  { id: 1, name: "Squat", type: "Strength", muscle: "Legs" },
  { id: 2, name: "Bench Press", type: "Strength", muscle: "Chest" },
  { id: 3, name: "Deadlift", type: "Strength", muscle: "Back" },
  { id: 4, name: "Pull Up", type: "Bodyweight", muscle: "Back" },
  { id: 5, name: "Plank", type: "Core", muscle: "Abs" },
];

const ExerciseLibrary: React.FC = () => {
  return (
    <div className="p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-4">
        Exercise Library
      </h2>
      <p className="text-gray-600 text-lg mb-6">
        Browse and search for exercises to add to your workouts.
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Muscle Group
              </th>
            </tr>
          </thead>
          <tbody>
            {exercises.map((exercise) => (
              <tr
                key={exercise.id}
                className="hover:bg-indigo-50/50 transition"
              >
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-800">
                  {exercise.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  {exercise.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  {exercise.muscle}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="mt-6 px-6 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-semibold shadow hover:scale-105 transition">
        Add Exercise
      </button>
    </div>
  );
};

export default ExerciseLibrary;

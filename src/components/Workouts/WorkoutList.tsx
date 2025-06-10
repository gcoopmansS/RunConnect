import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import WorkoutCard from "./WorkoutCard";
import { Workout } from "../../types";
import { Plus, Filter, Search } from "lucide-react";
import WorkoutModal from "./WorkoutModal";

const WorkoutList: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [modalWorkout, setModalWorkout] = useState<
    Partial<Workout> | undefined
  >(undefined);

  // Mock workouts data
  const mockWorkouts: Workout[] = [
    {
      id: "1",
      title: "Morning Tempo Run",
      description:
        "Comfortably hard effort for 20 minutes with 10-minute warm-up and cool-down",
      type: "tempo",
      duration: 40,
      distance: 6.2,
      intensity: "high",
      exercises: [
        {
          id: "1",
          name: "Warm-up Jog",
          description: "Easy jog to get the body moving",
          duration: 10,
          intensity: "easy",
        },
        {
          id: "2",
          name: "Tempo Run",
          description: "Sustained hard effort at tempo pace",
          duration: 20,
          intensity: "hard",
        },
        {
          id: "3",
          name: "Cool-down Jog",
          description: "Easy jog to recover and finish",
          duration: 10,
          intensity: "easy",
        },
      ],
      coachId: user?.id || "",
      assignedTo: ["3", "4"],
      scheduledDate: new Date("2024-01-15"),
      createdAt: new Date(),
    },
    {
      id: "2",
      title: "Speed Intervals",
      description:
        "6 x 800m at 5K pace with 2-minute recovery between intervals",
      type: "intervals",
      duration: 35,
      distance: 5.0,
      intensity: "high",
      exercises: [
        {
          id: "1",
          name: "Warm-up",
          description: "Easy running to prepare for intervals",
          duration: 15,
          intensity: "easy",
        },
        {
          id: "2",
          name: "800m Intervals",
          description: "Run 800m at 5K pace, repeat with rest",
          repetitions: 6,
          restTime: 120,
          intensity: "very hard",
        },
        {
          id: "3",
          name: "Cool-down",
          description: "Easy running to recover",
          duration: 10,
          intensity: "easy",
        },
      ],
      coachId: user?.id || "",
      assignedTo: ["4"],
      createdAt: new Date(),
    },
    {
      id: "3",
      title: "Easy Recovery Run",
      description:
        "Relaxed pace run to promote recovery and maintain aerobic base",
      type: "recovery",
      duration: 30,
      distance: 4.0,
      intensity: "low",
      exercises: [
        {
          id: "1",
          name: "Easy Run",
          description: "Relaxed, conversational pace",
          duration: 30,
          intensity: "very easy",
        },
      ],
      coachId: user?.id || "",
      assignedTo: ["3"],
      createdAt: new Date(),
    },
    {
      id: "4",
      title: "Core Strength Circuit",
      description:
        "Functional strength training focused on core stability and running-specific movements",
      type: "strength",
      duration: 25,
      intensity: "medium",
      exercises: [
        {
          id: "1",
          name: "Plank",
          description: "Hold plank position for core strength",
          duration: 60,
          repetitions: 3,
        },
        {
          id: "2",
          name: "Russian Twists",
          description: "Twist torso side to side for core",
          repetitions: 20,
          restTime: 30,
        },
        {
          id: "3",
          name: "Single-leg Glute Bridge",
          description: "Bridge with one leg raised",
          repetitions: 15,
          restTime: 30,
        },
        {
          id: "4",
          name: "Dead Bug",
          description: "Core stability exercise",
          repetitions: 10,
          restTime: 30,
        },
      ],
      coachId: user?.id || "",
      createdAt: new Date(),
    },
  ];

  const workoutTypes = [
    { value: "all", label: "All Types" },
    { value: "easy_run", label: "Easy Run" },
    { value: "tempo", label: "Tempo" },
    { value: "intervals", label: "Intervals" },
    { value: "long_run", label: "Long Run" },
    { value: "recovery", label: "Recovery" },
    { value: "strength", label: "Strength" },
  ];

  const filteredWorkouts = mockWorkouts.filter((workout) => {
    const matchesSearch =
      workout.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workout.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || workout.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            {user?.role === "coach" ? "Workout Library" : "My Workouts"}
          </h1>
          <p className="text-gray-600">
            {user?.role === "coach"
              ? "Create and manage workout templates for your athletes"
              : "View your assigned workouts and training plans"}
          </p>
        </div>

        {user?.role === "coach" && (
          <button
            type="button"
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            onClick={() => {
              setShowModal(true);
              setModalWorkout(undefined);
            }}
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Workout
          </button>
        )}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search workouts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
          >
            {workoutTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Workouts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
            onEdit={() => console.log("Edit workout:", workout.id)}
            onAssign={() => console.log("Assign workout:", workout.id)}
            showActions={user?.role === "coach"}
          />
        ))}
      </div>

      {filteredWorkouts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No workouts found
          </h3>
          <p className="text-gray-600">
            {searchTerm || selectedType !== "all"
              ? "Try adjusting your search or filter criteria"
              : user?.role === "coach"
              ? "Create your first workout to get started"
              : "No workouts have been assigned to you yet"}
          </p>
        </div>
      )}

      {/* Modal for creating a new workout */}
      <WorkoutModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSave={(workout) => {
          // Here you would add the new workout to your data source
          setShowModal(false);
        }}
        initialWorkout={modalWorkout}
      />
    </div>
  );
};

export default WorkoutList;

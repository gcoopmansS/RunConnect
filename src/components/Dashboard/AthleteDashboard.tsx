import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Athlete } from "../../types";
import {
  Activity,
  Calendar,
  TrendingUp,
  Clock,
  Play,
  CheckCircle,
  Trophy,
} from "lucide-react";

const AthleteDashboard: React.FC = () => {
  const { user } = useAuth();
  const athlete = user as Athlete;

  // Mock data for demonstration
  const stats = {
    weeklyDistance: 25.4,
    completedWorkouts: 4,
    upcomingSessions: 2,
    currentStreak: 5,
  };

  const todayWorkouts = [
    {
      id: "1",
      title: "Morning Easy Run",
      duration: 35,
      distance: 5.0,
      time: "6:00 AM",
      completed: false,
      type: "easy_run",
    },
    {
      id: "2",
      title: "Core Strength",
      duration: 20,
      time: "7:00 PM",
      completed: false,
      type: "strength",
    },
  ];

  const recentWorkouts = [
    {
      id: "1",
      title: "Tempo Run",
      distance: 6.2,
      duration: 28,
      rating: 4,
      date: "Yesterday",
    },
    {
      id: "2",
      title: "Long Run",
      distance: 12.1,
      duration: 72,
      rating: 5,
      date: "2 days ago",
    },
    {
      id: "3",
      title: "Speed Intervals",
      distance: 5.0,
      duration: 25,
      rating: 3,
      date: "3 days ago",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 p-8 rounded-3xl text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Welcome back, {athlete?.name}! 🏃‍♂️
            </h1>
            <p className="text-orange-100 text-lg">
              Ready to crush your training goals today?
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Trophy className="h-12 w-12 text-yellow-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium mb-1">
                Weekly Distance
              </p>
              <p className="text-3xl font-bold">{stats.weeklyDistance} mi</p>
            </div>
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Activity className="h-8 w-8" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium mb-1">
                Completed
              </p>
              <p className="text-3xl font-bold">{stats.completedWorkouts}</p>
            </div>
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <CheckCircle className="h-8 w-8" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium mb-1">
                Upcoming
              </p>
              <p className="text-3xl font-bold">{stats.upcomingSessions}</p>
            </div>
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Calendar className="h-8 w-8" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium mb-1">
                Current Streak
              </p>
              <p className="text-3xl font-bold">{stats.currentStreak} days</p>
            </div>
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <TrendingUp className="h-8 w-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Today's Workouts */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50">
        <div className="p-8 border-b border-gray-200/50">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Today's Training
          </h2>
        </div>
        <div className="p-8">
          <div className="space-y-4">
            {todayWorkouts.map((workout) => (
              <div
                key={workout.id}
                className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl hover:from-blue-100 hover:to-purple-100 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                    <Activity className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {workout.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {workout.duration} min
                      </span>
                      {workout.distance && <span>{workout.distance} mi</span>}
                      <span>• {workout.time}</span>
                    </div>
                  </div>
                </div>
                <button className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                  <Play className="h-5 w-5 mr-2" />
                  Start
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Workouts */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50">
        <div className="p-8 border-b border-gray-200/50">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Recent Workouts
          </h2>
        </div>
        <div className="p-8">
          <div className="space-y-4">
            {recentWorkouts.map((workout) => (
              <div
                key={workout.id}
                className="flex items-center justify-between p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl hover:from-green-100 hover:to-emerald-100 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {workout.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{workout.distance} mi</span>
                      <span>{workout.duration} min</span>
                      <span>• {workout.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 rounded-full transition-all duration-200 ${
                        i < workout.rating
                          ? "bg-gradient-to-r from-yellow-400 to-orange-500 shadow-sm"
                          : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Goals Progress */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 rounded-3xl text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-3">Weekly Goal Progress 🎯</h3>
            <p className="text-green-100 text-lg">
              You're 85% towards your 30-mile weekly target
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold mb-3">25.4 / 30 mi</p>
            <div className="w-40 bg-green-400/30 rounded-full h-3 backdrop-blur-sm">
              <div
                className="bg-white h-3 rounded-full shadow-sm transition-all duration-500"
                style={{ width: "85%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AthleteDashboard;

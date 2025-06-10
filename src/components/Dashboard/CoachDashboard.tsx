import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Coach } from '../../types';
import { Users, Calendar, Activity, TrendingUp, Clock, CheckCircle, Zap, Star } from 'lucide-react';

const CoachDashboard: React.FC = () => {
  const { user } = useAuth();
  const coach = user as Coach;

  // Mock data for demonstration
  const stats = {
    totalAthletes: coach?.athletes?.length || 0,
    activeWorkouts: 12,
    upcomingSessions: 5,
    completionRate: 87
  };

  const recentActivities = [
    { id: '1', athlete: 'Emma Davis', workout: 'Tempo Run', completed: true, time: '2 hours ago' },
    { id: '2', athlete: 'James Wilson', workout: 'Long Run', completed: true, time: '5 hours ago' },
    { id: '3', athlete: 'Emma Davis', workout: 'Recovery Run', completed: false, time: 'Tomorrow 6:00 AM' },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8 rounded-3xl text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Welcome back, {coach?.name}! 🏃‍♀️</h1>
            <p className="text-blue-100 text-lg">Here's what's happening with your athletes today.</p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Star className="h-12 w-12 text-yellow-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium mb-1">Athletes</p>
              <p className="text-3xl font-bold">{stats.totalAthletes}</p>
            </div>
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Users className="h-8 w-8" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium mb-1">Active Workouts</p>
              <p className="text-3xl font-bold">{stats.activeWorkouts}</p>
            </div>
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Activity className="h-8 w-8" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium mb-1">Upcoming Sessions</p>
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
              <p className="text-purple-100 text-sm font-medium mb-1">Completion Rate</p>
              <p className="text-3xl font-bold">{stats.completionRate}%</p>
            </div>
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <TrendingUp className="h-8 w-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50">
        <div className="p-8 border-b border-gray-200/50">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Recent Activity
          </h2>
        </div>
        <div className="p-8">
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-2xl hover:from-blue-50 hover:to-purple-50 transition-all duration-300 shadow-sm hover:shadow-md">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-2xl shadow-sm ${activity.completed ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-yellow-400 to-orange-500'}`}>
                    {activity.completed ? (
                      <CheckCircle className="h-6 w-6 text-white" />
                    ) : (
                      <Clock className="h-6 w-6 text-white" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">{activity.athlete}</p>
                    <p className="text-gray-600">{activity.workout}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-2">{activity.time}</p>
                  <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                    activity.completed 
                      ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800' 
                      : 'bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800'
                  }`}>
                    {activity.completed ? 'Completed' : 'Scheduled'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-3xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-white/20 rounded-2xl mr-4">
              <Zap className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold">Create Workout</h3>
          </div>
          <p className="text-blue-100 mb-6">Design a new training session for your athletes</p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-50 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
            Get Started
          </button>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 rounded-3xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-white/20 rounded-2xl mr-4">
              <Calendar className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold">Schedule Session</h3>
          </div>
          <p className="text-green-100 mb-6">Plan upcoming training sessions with athletes</p>
          <button className="bg-white text-green-600 px-6 py-3 rounded-xl hover:bg-green-50 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
            Schedule Now
          </button>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-8 rounded-3xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-white/20 rounded-2xl mr-4">
              <TrendingUp className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold">View Analytics</h3>
          </div>
          <p className="text-purple-100 mb-6">Track performance and progress metrics</p>
          <button className="bg-white text-purple-600 px-6 py-3 rounded-xl hover:bg-purple-50 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoachDashboard;
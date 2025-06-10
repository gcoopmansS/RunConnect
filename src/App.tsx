import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import CoachDashboard from './components/Dashboard/CoachDashboard';
import AthleteDashboard from './components/Dashboard/AthleteDashboard';
import WorkoutList from './components/Workouts/WorkoutList';

function App() {
  const { user, loading } = useAuth();
  const [showRegister, setShowRegister] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
          <p className="text-gray-600 font-medium">Loading RunConnect...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gray-200/50">
          {showRegister ? (
            <RegisterForm onSwitchToLogin={() => setShowRegister(false)} />
          ) : (
            <LoginForm onSwitchToRegister={() => setShowRegister(true)} />
          )}
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return user.role === 'coach' ? <CoachDashboard /> : <AthleteDashboard />;
      case 'workouts':
        return <WorkoutList />;
      case 'athletes':
        return (
          <div className="p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              My Athletes
            </h2>
            <p className="text-gray-600 text-lg">Athlete management coming soon...</p>
          </div>
        );
      case 'schedule':
        return (
          <div className="p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Schedule
            </h2>
            <p className="text-gray-600 text-lg">Calendar view coming soon...</p>
          </div>
        );
      case 'library':
        return (
          <div className="p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Exercise Library
            </h2>
            <p className="text-gray-600 text-lg">Exercise database coming soon...</p>
          </div>
        );
      case 'analytics':
        return (
          <div className="p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              Analytics
            </h2>
            <p className="text-gray-600 text-lg">Performance analytics coming soon...</p>
          </div>
        );
      case 'progress':
        return (
          <div className="p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              Progress
            </h2>
            <p className="text-gray-600 text-lg">Progress tracking coming soon...</p>
          </div>
        );
      case 'goals':
        return (
          <div className="p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
              Goals
            </h2>
            <p className="text-gray-600 text-lg">Goal setting coming soon...</p>
          </div>
        );
      case 'connect':
        return (
          <div className="p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-4">
              Find Coach
            </h2>
            <p className="text-gray-600 text-lg">Coach discovery coming soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent mb-4">
              Settings
            </h2>
            <p className="text-gray-600 text-lg">Account settings coming soon...</p>
          </div>
        );
      default:
        return user.role === 'coach' ? <CoachDashboard /> : <AthleteDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header 
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        showMenuButton={true}
      />
      
      <div className="flex">
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <main className="flex-1 md:ml-0">
          <div className="max-w-7xl mx-auto p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
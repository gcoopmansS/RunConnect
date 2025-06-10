import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, User, UserCheck } from 'lucide-react';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'athlete' as 'coach' | 'athlete',
  });
  const [error, setError] = useState('');
  const { register, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await register(formData);
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl transform hover:scale-105 transition-transform duration-300">
          <span className="text-white font-bold text-3xl">RC</span>
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
          Create account
        </h2>
        <p className="text-gray-600 text-lg">Join the RunConnect community</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl text-red-700 text-sm shadow-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Full name
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
              <User className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md"
              placeholder="Enter your full name"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Email address
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
              <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-4">
            I am a...
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className={`
              relative flex cursor-pointer rounded-2xl border-2 p-6 focus:outline-none transition-all duration-200 transform hover:scale-105
              ${formData.role === 'athlete' 
                ? 'border-transparent bg-gradient-to-br from-orange-400 to-red-500 text-white shadow-lg' 
                : 'border-gray-300 hover:border-gray-400 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md'
              }
            `}>
              <input
                type="radio"
                name="role"
                value="athlete"
                checked={formData.role === 'athlete'}
                onChange={handleInputChange}
                className="sr-only"
              />
              <div className="flex flex-col items-center w-full">
                <User className="h-8 w-8 mb-3" />
                <span className="text-sm font-semibold">Athlete</span>
              </div>
            </label>
            <label className={`
              relative flex cursor-pointer rounded-2xl border-2 p-6 focus:outline-none transition-all duration-200 transform hover:scale-105
              ${formData.role === 'coach' 
                ? 'border-transparent bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg' 
                : 'border-gray-300 hover:border-gray-400 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md'
              }
            `}>
              <input
                type="radio"
                name="role"
                value="coach"
                checked={formData.role === 'coach'}
                onChange={handleInputChange}
                className="sr-only"
              />
              <div className="flex flex-col items-center w-full">
                <UserCheck className="h-8 w-8 mb-3" />
                <span className="text-sm font-semibold">Coach</span>
              </div>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Password
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
              <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md"
              placeholder="Create a password"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Confirm password
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
              <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
            </div>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md"
              placeholder="Confirm your password"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-emerald-600 hover:via-blue-600 hover:to-purple-700 focus:ring-4 focus:ring-emerald-300 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Creating account...
            </div>
          ) : (
            'Create account'
          )}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <button
          onClick={onSwitchToLogin}
          className="text-transparent bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text hover:from-emerald-700 hover:to-blue-700 font-semibold transition-all duration-200"
        >
          Sign in
        </button>
      </p>
    </div>
  );
};

export default RegisterForm;
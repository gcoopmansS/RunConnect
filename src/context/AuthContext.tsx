import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Coach, Athlete } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User>) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock data for demo
const mockUsers: (Coach | Athlete)[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@coach.com',
    role: 'coach',
    specialization: ['Marathon Training', 'Speed Work'],
    experience: 8,
    certification: 'USATF Level 2',
    bio: 'Former collegiate runner specializing in distance training and racing strategy.',
    athletes: ['3', '4'],
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'Mike Rodriguez',
    email: 'mike@coach.com',
    role: 'coach',
    specialization: ['Sprints', 'Strength Training'],
    experience: 12,
    certification: 'NASM-CPT',
    bio: 'Track and field specialist with focus on speed and power development.',
    athletes: ['5'],
    createdAt: new Date(),
  },
  {
    id: '3',
    name: 'Emma Davis',
    email: 'emma@athlete.com',
    role: 'athlete',
    age: 28,
    experience: 'intermediate',
    goals: ['Half Marathon PR', 'Build Endurance'],
    coach: '1',
    personalBest: { '5k': '22:30', '10k': '47:15', 'half': '1:45:20' },
    createdAt: new Date(),
  },
  {
    id: '4',
    name: 'James Wilson',
    email: 'james@athlete.com',
    role: 'athlete',
    age: 34,
    experience: 'advanced',
    goals: ['Marathon Sub-3', 'Boston Qualifier'],
    coach: '1',
    personalBest: { '5k': '18:45', '10k': '39:20', 'half': '1:25:30', 'marathon': '3:05:15' },
    createdAt: new Date(),
  },
  {
    id: '5',
    name: 'Lisa Chen',
    email: 'lisa@athlete.com',
    role: 'athlete',
    age: 22,
    experience: 'beginner',
    goals: ['Complete First 5K', 'Build Running Habit'],
    coach: '2',
    createdAt: new Date(),
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('runconnect_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Mock authentication - in real app, this would be an API call
      const foundUser = mockUsers.find(u => u.email === email);
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('runconnect_user', JSON.stringify(foundUser));
      } else {
        throw new Error('Invalid credentials');
      }
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: Partial<User>) => {
    setLoading(true);
    try {
      // Mock registration
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name || '',
        email: userData.email || '',
        role: userData.role || 'athlete',
        createdAt: new Date(),
      };
      setUser(newUser);
      localStorage.setItem('runconnect_user', JSON.stringify(newUser));
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('runconnect_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
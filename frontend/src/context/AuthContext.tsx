import React, { createContext, useState, useEffect } from "react";
import { User } from "../types";
import { useUser, useClerk } from "@clerk/clerk-react";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthContextType {
  user: User | null;
  logout: () => void;
  loading: boolean;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user: clerkUser, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && clerkUser) {
      setUser({
        id: clerkUser.id,
        name:
          clerkUser.fullName ||
          clerkUser.username ||
          clerkUser.primaryEmailAddress?.emailAddress ||
          "",
        email: clerkUser.primaryEmailAddress?.emailAddress || "",
        role: "athlete", // Default or fetch from backend if needed
        createdAt: clerkUser.createdAt
          ? new Date(clerkUser.createdAt)
          : new Date(),
      });
      setLoading(false);
    } else if (isLoaded && !clerkUser) {
      setUser(null);
      setLoading(false);
    }
  }, [clerkUser, isLoaded]);

  const logout = () => {
    signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'L0' | 'L1' | 'L2' | 'L9';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  assignedAC?: number; // For L2 users
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const MOCK_USERS: Record<string, User & { password: string }> = {
  'admin@system.com': {
    id: '1',
    name: 'System Administrator',
    email: 'admin@system.com',
    role: 'L0',
    password: 'admin123',
  },
  'acim@ac.com': {
    id: '2',
    name: 'ACIM Manager',
    email: 'acim@ac.com',
    role: 'L1',
    password: 'acim123',
  },
  'aci@ac118.com': {
    id: '3',
    name: 'ACI Moderator',
    email: 'aci@ac118.com',
    role: 'L2',
    assignedAC: 118,
    password: 'aci123',
  },
  'warroom@system.com': {
    id: '4',
    name: 'War Room Commander',
    email: 'warroom@system.com',
    role: 'L9',
    password: 'wrm123',
  },
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockUser = MOCK_USERS[email];
    if (mockUser && mockUser.password === password) {
      const { password: _, ...userWithoutPassword } = mockUser;
      setUser(userWithoutPassword);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

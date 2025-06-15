
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  username?: string;
  isPremium: boolean;
  scansToday: number;
  maxDailyScans: number;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username?: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with Skapi authentication check
    // Check if user is already logged in via Skapi
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // TODO: Implement Skapi auth check
      // const userData = await skapi.getUser();
      // if (userData) {
      //   setUser(userData);
      // }
      
      // Dummy implementation for development
      const savedUser = localStorage.getItem('prizeFindsUser');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // TODO: Replace with Skapi login API call
      // const response = await skapi.login({ email, password });
      // setUser(response.user);
      
      // Dummy implementation for development
      const dummyUser: User = {
        id: '1',
        email,
        username: email.split('@')[0],
        isPremium: false,
        scansToday: 2,
        maxDailyScans: 5
      };
      
      setUser(dummyUser);
      localStorage.setItem('prizeFindsUser', JSON.stringify(dummyUser));
      
      console.log('Login successful - TODO: Integrate with Skapi');
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed. Please check your credentials.');
    }
  };

  const register = async (email: string, password: string, username?: string) => {
    try {
      // TODO: Replace with Skapi registration API call
      // const response = await skapi.register({ email, password, username });
      // setUser(response.user);
      
      // Dummy implementation for development
      const dummyUser: User = {
        id: '1',
        email,
        username: username || email.split('@')[0],
        isPremium: false,
        scansToday: 0,
        maxDailyScans: 5
      };
      
      setUser(dummyUser);
      localStorage.setItem('prizeFindsUser', JSON.stringify(dummyUser));
      
      console.log('Registration successful - TODO: Integrate with Skapi');
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('Registration failed. Please try again.');
    }
  };

  const logout = () => {
    // TODO: Replace with Skapi logout API call
    // await skapi.logout();
    
    setUser(null);
    localStorage.removeItem('prizeFindsUser');
    console.log('Logout successful - TODO: Integrate with Skapi');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('prizeFindsUser', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      register,
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

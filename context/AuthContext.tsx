import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedAuth = await AsyncStorage.getItem('peduliSampah_auth');
        if (savedAuth === 'true') {
          setIsAuthenticated(true);
        }
      } catch (e) {
        console.error("Failed to load auth state", e);
      }
    };
    checkAuth();
  }, []);

  const login = async () => {
    setIsAuthenticated(true);
    await AsyncStorage.setItem('peduliSampah_auth', 'true');
  };

  const logout = async () => {
    setIsAuthenticated(false);
    await AsyncStorage.removeItem('peduliSampah_auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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
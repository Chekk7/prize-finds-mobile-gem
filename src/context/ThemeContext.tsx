
import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  isBlueFilterEnabled: boolean;
  toggleDarkMode: () => void;
  toggleBlueFilter: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBlueFilterEnabled, setIsBlueFilterEnabled] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const savedBlueFilter = localStorage.getItem('blue-filter') === 'true';
    
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
    
    setIsBlueFilterEnabled(savedBlueFilter);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }

    if (isBlueFilterEnabled) {
      body.classList.add('blue-light-filter');
      localStorage.setItem('blue-filter', 'true');
    } else {
      body.classList.remove('blue-light-filter');
      localStorage.setItem('blue-filter', 'false');
    }
  }, [isDarkMode, isBlueFilterEnabled]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleBlueFilter = () => {
    setIsBlueFilterEnabled(!isBlueFilterEnabled);
  };

  return (
    <ThemeContext.Provider value={{
      isDarkMode,
      isBlueFilterEnabled,
      toggleDarkMode,
      toggleBlueFilter
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};


import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  isBlueFilterEnabled: boolean;
  toggleDarkMode: () => void;
  toggleBlueFilter: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [isBlueFilterEnabled, setIsBlueFilterEnabled] = useState(() => {
    return localStorage.getItem('blue-filter') === 'true';
  });

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const root = document.getElementById('root');
    
    console.log('Applying theme changes:', { isDarkMode, isBlueFilterEnabled });
    
    // Apply dark mode class and background
    if (isDarkMode) {
      html.classList.add('dark');
      body.classList.add('dark');
      if (root) root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      console.log('Dark mode enabled');
    } else {
      html.classList.remove('dark');
      body.classList.remove('dark');
      if (root) root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      console.log('Light mode enabled');
    }

    // Apply blue light filter
    if (isBlueFilterEnabled) {
      body.classList.add('blue-light-filter');
      localStorage.setItem('blue-filter', 'true');
      console.log('Blue light filter enabled');
    } else {
      body.classList.remove('blue-light-filter');
      localStorage.setItem('blue-filter', 'false');
      console.log('Blue light filter disabled');
    }
  }, [isDarkMode, isBlueFilterEnabled]);

  const toggleDarkMode = () => {
    console.log('Toggling dark mode from:', isDarkMode, 'to:', !isDarkMode);
    setIsDarkMode(!isDarkMode);
  };

  const toggleBlueFilter = () => {
    console.log('Toggling blue filter from:', isBlueFilterEnabled, 'to:', !isBlueFilterEnabled);
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

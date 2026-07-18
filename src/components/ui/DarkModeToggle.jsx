import React, { useEffect, useState } from 'react';
import { HiMoon, HiSun } from 'react-icons/hi';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Set initial theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const enabled = savedTheme === 'dark' || (!savedTheme && prefersDark);

    console.log('[DarkMode] Initial theme:', savedTheme, '| Prefers dark:', prefersDark);

    setIsDarkMode(enabled);
    document.documentElement.classList.toggle('dark', enabled);
    // Explicitly set the theme on body as well
    document.documentElement.classList.toggle('light', !enabled);
  }, []);

  const toggleDarkMode = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');

    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(next ? 'dark' : 'light');

    console.log('[DarkMode] Switched to:', next ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleDarkMode}
      id="darkModeToggle"
      className="p-2 rounded-full transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 cursor-pointer mr-2"
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      tabIndex="0"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleDarkMode();
        }
      }}
    >
      {isDarkMode ? (
        <HiSun className="h-5 w-5 text-yellow-400" />
      ) : (
        <HiMoon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
      )}
    </button>
  );
};

export default DarkModeToggle;

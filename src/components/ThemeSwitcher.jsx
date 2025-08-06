// src/components/Header/ThemeSwitcher.jsx
import { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ThemeSwitcher = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setDarkMode(!darkMode);
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="tw-p-2 tw-rounded-full tw-text-text tw-bg-card tw-transition-colors tw-duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {darkMode ? (
        <FaSun className="tw-text-xl tw-text-white" />
      ) : (
        <FaMoon className="tw-text-xl tw-text-gray-800" />
      )}
    </motion.button>
  );
};

export default ThemeSwitcher;

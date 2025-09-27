import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Set initial theme
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute('data-theme', !isDarkMode ? 'dark' : 'light');
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          <h1>BPE Visualizer</h1>
          <span className="navbar-subtitle">Byte Pair Encoding Tokenizer</span>
        </div>
        <div className="navbar-links">
          <a href="#" className="navbar-link">About</a>
          <a href="#" className="navbar-link">Docs</a>
          <a href="#" className="navbar-link">GitHub</a>
          <button 
            onClick={toggleTheme}
            className="navbar-icon"
            title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

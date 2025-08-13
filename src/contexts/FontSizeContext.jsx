import React, { createContext, useState, useEffect } from 'react';

export const FontSizeContext = createContext();

export const FontSizeProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(18); // Default font size

  useEffect(() => {
    // Load saved font size from localStorage if available
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
      setFontSize(parseInt(savedFontSize, 10));
    }
  }, []);

  useEffect(() => {
    // Apply font size to body element
    document.body.style.fontSize = `${fontSize}px`;
    // Save to localStorage
    localStorage.setItem('fontSize', fontSize.toString());
  }, [fontSize]);

  const increaseFontSize = () => {
    if (fontSize < 30) {
      setFontSize(prevSize => prevSize + 2);
    }
  };

  const decreaseFontSize = () => {
    if (fontSize > 12) {
      setFontSize(prevSize => prevSize - 2);
    }
  };

  return (
    <FontSizeContext.Provider value={{ fontSize, increaseFontSize, decreaseFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};

import React, { createContext, useState } from "react";

// ✅ Context
export const categories = createContext();

// ✅ Provider Component (Capital Letter REQUIRED)
const CategoriesContextProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const value = {
    selectedCategory,
    setSelectedCategory,
  };

  return (
    <categories.Provider value={value}>
      {children}
    </categories.Provider>
  );
};

export default CategoriesContextProvider;

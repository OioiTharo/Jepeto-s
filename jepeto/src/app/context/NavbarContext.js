//jepeto\src\app\context\NavbarContext.js
"use client";

import React, { createContext, useContext, useState } from 'react';

const NavbarContext = createContext();

export const useNavbar = () => {
  return useContext(NavbarContext);
};

export const NavbarProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState('/');

  const updateActiveMenu = (path) => {
    setActiveMenu(path);
  };

  return (
    <NavbarContext.Provider value={{ activeMenu, updateActiveMenu }}>
      {children}
    </NavbarContext.Provider>
  );
};

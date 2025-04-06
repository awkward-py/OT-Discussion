"use client";

import React, { useEffect } from 'react';
import { useTheme } from '@/context/ThemeProvider';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Image from 'next/image';

const Theme = () => {
  const { mode, setMode } = useTheme();

  // Check and apply the user's system preference for dark mode on component mount
  useEffect(() => {
    const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (systemDarkMode && mode !== 'dark') {
      setMode('dark'); // Set to dark mode if the system preference is dark
      localStorage.theme = 'dark'; // Store in local storage
    } else if (!systemDarkMode && mode !== 'light') {
      setMode('light'); // Set to light mode if the system preference is light
      localStorage.theme = 'light'; // Store in local storage
    }
  }, []); // Empty dependency array to run this effect only once on mount

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.theme = newMode; 
  };

  return (
    <Menubar className="relative border-none bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger
          className="focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200"
          onClick={toggleTheme} 
        >
          {mode === 'light' ? (
            <Image
              src="/assets/icons/sun.svg"
              alt="sun"
              width={20}
              height={20}
              className="active-theme"
            />
          ) : (
            <Image
              src="/assets/icons/moon.svg"
              alt="moon"
              width={20}
              height={20}
              className="active-theme"
            />
          )}
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
};

export default Theme;
